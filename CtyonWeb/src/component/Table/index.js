import {Table, Button, Popconfirm} from 'antd';
import React from 'react'
import request from '../../api/Net'


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
            title: 'MODEL',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: 'sysVersion',
            dataIndex: 'sysversion',
            key: 'sysversion'
        },
        {
            title: 'appVersion',
            dataIndex: 'appversion',
            key: 'appversion'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'IsImpower',
            dataIndex: 'isimpower',
            key: 'isimpower',
            width: 200,
            render: (text, record, index) => (
                <Button onClick={() => this.impowerClick(index)}> {text == 1 ? '已授权(点击取消)' : '点击授权'}</Button>
            )
        },
        {
            title: 'operation',
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
                    console.log('getAllImpowers : ' + JSON.stringify(data));
                    if (data.data) {
                        const dataSource = [...data.data];
                        dataSource.map(record => {
                            record.key = this.props.count;
                            this.onCountChange(this.props.count + 1);
                            console.log("key = " + record.key);
                        });
                        this.onDataChange(data.data);
                    }
                }
            });
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
                    isimpower: impower,
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
                    isimpower: impower,
                }
            )
        })
            .then(response => {
                console.log('deleteImpower : ' + JSON.stringify(response));
                // const dataSource = [...this.props.data];
                // dataSource.splice(index, 1);
                // this.onDataChange(dataSource);
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