import React from "react";
import {Icon, Button} from 'antd';
import * as XLSX from "xlsx";
import request from '../../../api/Net';

class ImpowerAdd extends React.Component {

    onImportExcel = file => {
        // 获取上传的文件对象
        const {files} = file.target;
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const {result} = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, {type: 'binary'});
                let data = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break; // 如果只取第一张表，就取消注释这行
                    }
                }
                this.setState({
                    dataUpload: data,
                }, function () {
                    console.log(this.state.dataUpload);
                })
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log('文件类型不正确');
                return;
            }
        };
        if (file) {
            try {
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
            }catch (e) {

            }
        }
    };

    upLoadData = () => {
        request({
            url: '/impower/admin/insertImpowers',
            method: 'post',
            headers: {		 // 请求头
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: this.state.dataUpload,
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
    };

    state = {
        dataUpload: {},
    };

    render() {
        return (
            <div style={{marginTop: 100}}>
                <Icon type={"upload"}/>
                <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
                <Button onClick={this.upLoadData}>上传</Button>
                <p>支持 .xlsx、.xls 格式的文件</p>
            </div>
        );
    }
}

export default ImpowerAdd;