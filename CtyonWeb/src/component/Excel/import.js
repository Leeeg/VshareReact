import React, {Component} from 'react';
import * as XLSX from "xlsx";

class ExcelInput extends Component {

    constructor(props){
        super();
    }

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
                    dataUpload: JSON.stringify(data),
                }, function () {
                    console.log(this.state.dataUpload);
                })
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log('文件类型不正确');
                return;
            }
        };
        console.log(files);
        if (files) {
            try {
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
            } catch (e) {

            }
        } else {
        }
    };

    render() {
        return (
            <div>
                <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
            </div>
        )

    }
}

export default ExcelInput;