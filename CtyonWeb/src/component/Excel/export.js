import React, {Component} from 'react';
import {Button} from "antd";
import * as XLSX from "xlsx";
import './style.css'

const columns = [
    {
        title: 'MEID',
        dataIndex: 'meid',
        key: 'meid'
    },
    // {
    //     title: 'IMEI',
    //     dataIndex: 'imei',
    //     key: 'imei'
    // },
    // {
    //     title: 'IMEI2',
    //     dataIndex: 'imei2',
    //     key: 'imei2'
    // },
    // {
    //     title: 'ICCID',
    //     dataIndex: 'iccid',
    //     key: 'iccid'
    // },
    // {
    //     title: 'ICCID2',
    //     dataIndex: 'iccid2',
    //     key: 'iccid2'
    // },
    // {
    //     title: 'MODEL',
    //     dataIndex: 'model',
    //     key: 'model'
    // },
    // {
    //     title: 'sysVersion',
    //     dataIndex: 'sysversion',
    //     key: 'sysversion'
    // },
    // {
    //     title: 'appVersion',
    //     dataIndex: 'appversion',
    //     key: 'appversion'
    // },
    // {
    //     title: 'Location',
    //     dataIndex: 'location',
    //     key: 'location'
    // },
    {
        title: 'IsImpower',
        dataIndex: 'isimpower',
        key: 'isimpower',
    },
];

class ExcelExport extends Component {

    exportExcel = (headers, fileName = '授权信息表.xlsx') => {
        const _headers = headers
            .map((item, i) => Object.assign({}, {key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1}))
            .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {key: next.key, v: next.title}}), {});
        const output = Object.assign({}, _headers);
        console.log(output);
        // 获取所有单元格的位置
        const outputPos = Object.keys(output);
        // 计算出范围 ,["A1",..., "H2"]
        const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
        console.log(ref);
        // 构建 workbook 对象
        const wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                mySheet: Object.assign(
                    {},
                    output,
                    {
                        '!ref': ref,
                        '!cols': [{wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}],
                    },
                ),
            },
        };

        // 导出 Excel
        XLSX.writeFile(wb, fileName);
    };

    render() {
        return (
            <div id='xport'>
                <span id='button-download' >
                <Button block onClick={() => this.exportExcel(columns)}>下载</Button>
                <p style={{marginTop: 8}}>点击下载模板</p>
                </span>
            </div>
        )

    }
}

export default ExcelExport;