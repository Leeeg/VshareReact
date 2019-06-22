import {Table, Button, Popconfirm} from 'antd';
import React from 'react'
import request from '../../api/Net'
import {getAmapKey} from "../../util/utils";


class ImpowerTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            baseIndex: 0,
        }
    }

    paginationProps = {
        // showSizeChanger: true,
        // showQuickJumper: true,
        pageSize: 15, // 每页条数
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            width: 60
        },
        {
            title: 'MEID',
            dataIndex: 'meid',
            key: 'meid',
            width: 100
        },
        {
            title: 'IMEI',
            dataIndex: 'imei',
            key: 'imei',
            width: 100
        },
        {
            title: 'IMEI2',
            dataIndex: 'imei2',
            key: 'imei2',
            width: 100
        },
        {
            title: 'ICCID',
            dataIndex: 'iccid',
            key: 'iccid',
            width: 130
        },
        {
            title: 'ICCID2',
            dataIndex: 'iccid2',
            key: 'iccid2',
            width: 130
        },
        {
            title: '软件名',
            dataIndex: 'model',
            key: 'model',
            width: 100
        },
        {
            title: 'ROM版本',
            dataIndex: 'sysversion',
            key: 'sysversion',
            width: 130
        },
        {
            title: '对讲版本',
            dataIndex: 'appversion',
            key: 'appversion',
            width: 100
        },
        {
            title: '位置',
            dataIndex: 'location',
            key: 'location',
            width: 100,
            render: (text, record, index) => (
                <p>{this.props.data[this.state.baseIndex + index]? this.props.data[this.state.baseIndex + index].location : ""}</p>
            )
        },
        {
            title: '是否授权',
            dataIndex: 'isimpower',
            key: 'isimpower',
            width: 200,
            render: (text, record, index) => (
                <Button onClick={() => this.impowerClick(this.state.baseIndex + index)}> {text == 1 ? '已授权(点击取消)' : '点击授权'}</Button>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) =>
                this.props.data.length >= 1 ? (
                    <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(this.state.baseIndex + index)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    onDataChange = data => {
        this.props.changeData(data);
    };

    onCountChange = count => {
        this.props.changeCount(count);
    };

    componentDidMount() {
        this.loadData();
    }

    tableOnchange = (pagination, filters, sorter, extra) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
        console.log(extra);
        this.setState({
            baseIndex: (pagination.current -1) * pagination.pageSize,
        })
    };

    loadData = () => {
        this.onCountChange(1);
        let indexArr = [];
        request({
            url: '/admin/getAllImpowers',
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    console.log('getAllImpowers 1 : ' + JSON.stringify(data));
                    let locationPoints = [];
                    if (data.data) {
                        const dataSource = [...data.data];
                        for (let i = 0; i < dataSource.length; i++) {
                            let record = dataSource[i];
                            record.key = i + 1;
                            record.location = '';
                            if (record.locationy && record.locationx) {
                                indexArr.push(i);
                                locationPoints.push(record.locationy + ',' + record.locationx);
                            }
                        }
                        console.log(dataSource);
                        this.onCountChange(dataSource.length);
                        this.onDataChange(dataSource);
                        return locationPoints;
                    }
                }
            })
            .then(data => {
                if (data) {
                    console.log('getAllImpowers 2 : ' + JSON.stringify(data));
                    const points = data.join('|');
                    console.log('points : ' + points);

                    request({
                        url: 'https://restapi.amap.com/v3/geocode/regeo?' +
                            'key=' + getAmapKey() +
                            '&location=' + points +
                            '&poitype=&radius=&extensions=base&batch=true&roadlevel=1',
                        method: 'GET',
                    })
                        .then(data => {
                            if (data) {
                                console.log('loadLocation getArr : ' + JSON.stringify(data));
                                if (data.status == 1) {
                                    const locationArr = data.regeocodes;
                                    console.log("location = " + locationArr);
                                    return locationArr;
                                }
                            }
                        })
                        .then(data => {
                            if (data) {
                                const dataSource = [...this.props.data];
                                console.log("add location to data");
                                data.map(record => {
                                    const location = record.addressComponent.province;
                                    console.log("location : " + location);
                                    dataSource[indexArr.pop()].location = location;
                                });
                                this.onDataChange(dataSource);
                            }
                        });
                }

            })
    };

    impowerClick = (index) => {
        console.log('impowerClick : index = ' + index);
        const indexData = this.props.data[index];
        const impower = indexData.isimpower == 0 ? 1 : 0;
        console.log('impowerClick : impower = ' + impower);
        request({
            url: '/admin/doImpower',
            method: 'POST',
            body: JSON.stringify({
                    meid: indexData.meid,
                    imei: indexData.imei,
                    imei2: indexData.imei2,
                    iccid: indexData.iccid,
                    iccid2: indexData.iccid2,
                    isimpower: impower
                }
            )
        })
            .then(response => {
                console.log('doImpower : ' + JSON.stringify(response));
                const data = [...this.props.data];   //复制数组--浅拷贝
                this.onDataChange(data.map((item, idx) => idx === index ? {...item, isimpower: impower} : item))
            });
    };

    handleDelete = (index) => {
        console.log('handleDelete : baseIndex = ' + this.state.baseIndex);
        console.log('handleDelete : index = ' + index);
        const indexData = this.props.data[index];
        const impower = indexData.isimpower ? 0 : 1;
        request({
            url: '/admin/deleteImpower',
            method: 'POST',
            body: JSON.stringify({
                    meid: indexData.meid,
                    imei: indexData.imei,
                    imei2: indexData.imei2,
                    iccid: indexData.iccid,
                    iccid2: indexData.iccid2,
                    isimpower: impower
                }
            )
        })
            .then(data => {
                if (data)
                    console.log('deleteImpower : ' + JSON.stringify(data));
                this.loadData();
            });
    };

    render() {
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    pagination={this.paginationProps}
                    onChange={this.tableOnchange}
                />
            </div>
        );
    }
}

export default ImpowerTable;