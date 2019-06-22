import React from "react";
import {Modal, message, Col, Upload, Form, Icon, Input, Row, Select, Button} from 'antd';
import request from '../../../api/Net';
import * as XLSX from "xlsx";
import './style.css'
import ExcelExport from "../../../component/Excel/export";
import CustomBreadcrumb from "../../../component/CustomBreadcrumb";

const Dragger = Upload.Dragger;
const {Option} = Select;
const confirm = Modal.confirm;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};


class ImpowerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.option.beforeUpload = this.option.beforeUpload.bind(this);
    }

    state = {
        dataUpload: '',
        meid: '',
        isimpower: 1
    };

    option = {
        name: 'file',
        accept: '.xlsx, .xls',
        showUploadList: false,
        multiple: false,
        directory: false,
        beforeUpload(file, fileList) {
            console.log(file + " ----- " + fileList.length);
            this.onImportExcel(file);
            return false;
        }
    };

    showConfirm = () => {
        const that = this;
        confirm({
            title: '文件导入成功',
            content: <p>sas</p>,
            onOk() {
                console.log('dataUpload >>>> ');
                request({
                    url: '/admin/insertImpowers',
                    method: 'POST',
                    body: JSON.stringify({
                        listData: that.state.dataUpload,
                    }),
                })
                    .then(function (response) {
                        console.log(response);
                    })
            },
            onCancel() {
                message.info('已取消，请重新选取文件！')
            }
        });
    };

    onImportExcel = file => {
        // 获取上传的文件对象
        // const {files} = file.target;
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
                        console.log('fileReader.onload : data = ' + data);
                        break; // 如果只取第一张表，就取消注释这行
                    }
                }
                if (data && data.length > 0 && data[0].MEID && data[0].IsImpower) {
                    const dataUpload = JSON.stringify(data);
                    console.log('onImportExcel->dataUpload : ' + data.length + '条数据  ' + dataUpload);
                    this.setState({
                        dataUpload: JSON.stringify(data),
                    }, function () {
                        console.log('this.state.dataUpload : ' + this.state.dataUpload);
                        this.showConfirm();
                    })
                } else {
                    message.error("文件类型不正确");
                }
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                message.error("文件导入失败");
            }
        };
        console.log(file);
        if (file) {
            try {
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(file);
            } catch (e) {
                console.log('readAsBinaryString ERROR ： ' + e);
            }
        } else {
            console.log('file is undefined');
        }
    };

    meidChange = e => {
        console.log('meidChange ： ' + e.target.value);
        this.setState({meid: e.target.value})
    };

    isimpowerChange = isimpower => {
        console.log('isimpowerChange ： ' + isimpower);
        this.setState({isimpower: isimpower})
    };

    onAddClick = () => {
        const that = this;
        console.log('dataUpload >>>> ');
        if (!this.state.meid) {
            message.error('MEID为空或已添加');
            return;
        }
        request({
            url: '/admin/addImpower',
            method: 'POST',
            body: JSON.stringify({
                meid: this.state.meid,
                isimpower: this.state.isimpower
            }),
        })
            .then(function (response) {
                console.log(response);
                if (response && response.code === 200) {
                    message.success('添加成功');
                    that.setState({meid: ''});
                    console.log('textInput : ' + that.textInput);
                } else {
                    alert(response);
                }
            })
    };

    render() {

        return (
            <div>
                <CustomBreadcrumb arr={['授权管理', '添加']}/>
                <Row className='row' type="flex" justify="center">
                    <Col className="col" span={20}>
                        <div className='gutter-box'>
                            <Form {...formItemLayout} style={{width: 1000}}>
                                <Form.Item label="设备号码" help="请输入设备唯一识别码MEID">
                                    <Input allowClear={true} onChange={this.meidChange.bind(this)} placeholder="MEID" id="meid"/>
                                </Form.Item>
                                <Form.Item label="是否授权" hasFeedback validateStatus="success" help="点击选择是否授权">
                                    <Select defaultValue="1" onChange={this.isimpowerChange.bind(this)}>
                                        <Option value="1">授权</Option>
                                        <Option value="0">不授权</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col className="col" span={4}>
                        <div className='gutter-box'>
                            <span id='button-update'>
                                <Button onClick={this.onAddClick} block>添加</Button>
                                <p style={{marginTop: 8}}>点击提交</p>
                            </span>
                        </div>
                    </Col>
                </Row>

                <Row className='row' type="flex" justify="center">
                    <Col className="col" span={20}>
                        <div className='gutter-box'>
                            <Dragger {...this.option}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox"/>
                                </p>
                                <p className="ant-upload-text">点击或拖拽文件到此区域</p>
                                <p className="ant-upload-hint">
                                    请使用本站提供的模板excel文件作为导入文件，模板可在右侧下载！
                                </p>
                            </Dragger>
                        </div>
                    </Col>
                    <Col className="col" span={4}>
                        <div className='gutter-box'>
                            <ExcelExport/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ImpowerAdd;