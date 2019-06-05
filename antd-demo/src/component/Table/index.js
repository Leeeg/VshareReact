import {Table, Button} from 'antd';
import React from 'react'
import request from '../../api/Net'

const columns = [
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
        dataIndex: 'sysVersion',
        key: 'sysVersion'
    },
    {
        title: 'appVersion',
        dataIndex: 'appVersion',
        key: 'appVersion'
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
    },
    {
        title: 'IsImpower',
        dataIndex: 'isImpower',
        key: 'isImpower',
        render: isImpower => (
            <span>{isImpower ? '已授权' : ''}</span>
        )
    },
];

class ImpowerTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: []
    };

    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    componentDidMount() {
        request({
            url: '/impower/admin/getAllImpowers?key=1',
            method: 'get',
        })
            .then(function (res) {
                console.log(res);
            })
            .then(data => {
                const arr = [];
                for (let i = 0; i < 50; i++) {
                    arr.push({
                        key: i,
                        meid: `123` + i,
                        imei: 456,
                        isImpower: true,
                    });
                }
                this.setState({
                    data: arr
                }, function () {
                    console.log('length = ' + this.state.data.length);
                });
            });
    }

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{minHeight: 100, backgroundColor: "yellow", marginBottom: 16}}>

                </div>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{marginLeft: 8}}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}/>
            </div>
        );
    }
}

export default ImpowerTable;