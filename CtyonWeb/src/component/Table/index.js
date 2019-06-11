import {Table, Button} from 'antd';
import React from 'react'
import request from '../../api/Net'

class ImpowerTable extends React.Component {

    state = {
        data: []
    };

    paginationProps = {
        // showSizeChanger: true,
        // showQuickJumper: true,
        pageSize: 15, // 每页条数
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record) => `${record.id}`
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
            render: (isimpower, record) => (
                <Button onClick={() => this.impowerClick(record)}> {isimpower ==1 ? '已授权(点击取消)' : '点击授权'}</Button>
            )
        },
    ];

    componentDidMount() {
        request({
            url: '/impower/admin/getAllImpowers',
            method: 'GET',
        })
            .then(data => {
                console.log('getAllImpowers : ' + JSON.stringify(data));
                this.setState({
                    data: data.data
                }, function () {
                    console.log('setState : ' + this.state.data)
                    ;
                });
            });
    }

    impowerClick = (record) => {
        const index = record.id - 1;
        const indexData = this.state.data[index];
        const impower = indexData.isimpower ? 0 : 1;
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
                const data = [...this.state.data];   //复制数组--浅拷贝
                this.setState({
                    data: data.map((item, idx) => idx === index ? {...item, isimpower: impower} : item),
                });
            });
    };

    render() {
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={this.paginationProps}
                    scroll={{y: 700}}
                />
            </div>
        );
    }
}

export default ImpowerTable;