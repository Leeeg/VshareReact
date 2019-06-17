import {Table, Button, Popconfirm} from 'antd';
import React from 'react'
import request from '../../api/Net'
import {getAmapKey} from "../../util/utils";


class ImpowerTable extends React.Component {

    constructor(props) {
        super(props);
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
        },
        {
            title: 'MEID',
            dataIndex: 'meid',
            key: 'meid'
        },
        {
            title: 'IMEI',
            dataIndex: 'imei',
            key: 'imei'
        },
        {
            title: 'IMEI2',
            dataIndex: 'imei2',
            key: 'imei2'
        },
        {
            title: 'ICCID',
            dataIndex: 'iccid',
            key: 'iccid'
        },
        {
            title: 'ICCID2',
            dataIndex: 'iccid2',
            key: 'iccid2'
        },
        {
            title: '软件名',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: 'ROM版本',
            dataIndex: 'sysversion',
            key: 'sysversion'
        },
        {
            title: '对讲版本',
            dataIndex: 'appversion',
            key: 'appversion'
        },
        {
            title: '位置',
            dataIndex: 'location',
            key: 'location',
            render: (text, record, index) => (
                <p>{this.props.data[index].location}</p>
            )
        },
        {
            title: '是否授权',
            dataIndex: 'isimpower',
            key: 'isimpower',
            width: 200,
            render: (text, record, index) => (
                <Button onClick={() => this.impowerClick(index)}> {text == 1 ? '已授权(点击取消)' : '点击授权'}</Button>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) =>
                this.props.data.length >= 1 ? (
                    <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(index)}>
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

    loadData = () => {
        this.onCountChange(1);
        request({
            url: '/impower/admin/getAllImpowers',
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    console.log('getAllImpowers 1 : ' + JSON.stringify(data));
                    let locationGPS = [];
                    if (data.data) {
                        const dataSource = [...data.data];
                        for (let i = 0; i < dataSource.length; i++) {
                            let record = dataSource[i];
                            record.key = i + 1;
                            console.log("key = " + record.key);
                            locationGPS.push(record.locationy + ',' + record.locationx);
                        }
                        this.onCountChange(dataSource.length);
                        this.onDataChange(dataSource);
                        return locationGPS;
                    }
                }
            })
            .then(data => {
                console.log('getAllImpowers 2 : ' + JSON.stringify(data));
                const gpsPoints = data.join('|');
                console.log('gpsPoints : ' + gpsPoints);
                request({
                    url: 'https://restapi.amap.com/v3/assistant/coordinate/convert?locations='
                        + gpsPoints
                        + '&coordsys=gps&output=json&key=' + getAmapKey(),
                    method: 'GET',
                })
                    .then(data => {
                        if (data) {
                            console.log('loadLocation changeGPS : ' + JSON.stringify(data));
                            if (data.status == 1) {
                                const locations = data.locations.toString().replace(';', '|');
                                return locations;
                            }
                        }
                    })
                    .then(data => {
                        if (data){
                            console.log('getAllImpowers 3 : ' + JSON.stringify(data));
                            request({
                                url: 'https://restapi.amap.com/v3/geocode/regeo?' +
                                    'key=' + getAmapKey() +
                                    '&location=' + data +
                                    '&poitype=&radius=&extensions=base&batch=true&roadlevel=1',
                                method: 'GET',
                            })
                                .then(data => {
                                    if (data) {
                                        console.log('loadLocation changeGPS : ' + JSON.stringify(data));
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
                                        if (data.length === dataSource.length) {
                                            console.log("add location to data");
                                            for (let i = 0; i < dataSource.length; i++) {
                                                const location = data[i].formatted_address;
                                                console.log("location : " + location);
                                                let record = dataSource[i];
                                                record.location = location;
                                            }
                                            this.onDataChange(dataSource);
                                        } else {
                                            console.log(data.length + ' --- ' + dataSource.length);
                                        }
                                    }
                                });
                        }
                    });
            })
    };

    impowerClick = (index) => {
        console.log('impowerClick : index = ' + index);
        const indexData = this.props.data[index];
        const impower = indexData.isimpower == 0 ? 1 : 0;
        console.log('impowerClick : impower = ' + impower);
        request({
            url: '/impower/admin/doImpower',
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
        console.log('handleDelete : index = ' + index);
        const indexData = this.props.data[index];
        const impower = indexData.isimpower ? 0 : 1;
        request({
            url: '/impower/admin/deleteImpower',
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
                />
            </div>
        );
    }
}

export default ImpowerTable;