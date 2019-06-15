import React, {Component} from 'react';
import ExcelTable from '../../../component/Table'
import './style.css'
import {Card, List} from "antd";
import CustomBreadcrumb from "../../../component/CustomBreadcrumb";

class ImpowerShow extends Component {

    state = {
        data: [],
        count: 1,
        statistics: [
            {
                value: '总数据：',
            },
            {
                value: '已授权：',
            },
            {
                value: '未授权：',
            },
            {
                value: '重复MEID：',
            },
        ]
    };

    setData(data) {
        console.log("setData : " + data);
        const statistics = [...this.state.statistics];
        this.setState({
            data: data,
            statistics: statistics.map((item, idx) => idx === 0 ? {...item, value: '总数据 : ' + data.length} : item)
        });
    }

    setCount(count) {
        console.log("setCount : " + count);
        this.setState({count: count});
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['授权管理', '查看']}/>
                <div className='row'>
                    <List
                        grid={{ gutter: 32, column: 4 }}
                        dataSource={this.state.statistics}
                        renderItem={item => (
                            <List.Item className='list-item'>
                                <Card>{item.value}</Card>
                            </List.Item>
                        )}
                    />
                </div>
                <ExcelTable data={this.state.data} count={this.state.count}
                            changeData={(data) => this.setData(data)}
                            changeCount={(count) => this.setCount(count)}/>
            </div>
        )
    }
}

export default ImpowerShow;