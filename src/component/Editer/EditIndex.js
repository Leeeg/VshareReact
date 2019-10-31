import React, {Component} from 'react';
import Editor from 'for-editor'
import request from "../../api/Net";
import {Button, Icon, Upload, message, Input} from 'antd';
import style from './EditStyle.css'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

@withRouter @inject('appStore') @observer
class MarkdownEdit extends Component {

    state = {
        markdown: '',
        title: '',
        tag: '',
        describe: '',
        markId: '',
        mobile: false
    }

    componentDidMount() {
        this.resize()
        console.log("props", this.props)
        window.addEventListener('resize', () => {
            this.resize()
        })

        const mId = this.props.appStore._markId.length > 5 ? this.props.appStore._markId : (new Date()).valueOf();
        console.log("markId", mId)
        this.setState({
            title: this.props.appStore._title,
            tag: this.props.appStore._tag,
            describe: this.props.appStore._describe,
            markdown: this.props.appStore._content,
            markId: mId
        })
        this.interval = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.handleSave()
    }

    resize() {
        if (window.matchMedia('(min-width: 768px)').matches) {
            this.setState({
                mobile: false
            })
        } else {
            this.setState({
                mobile: true
            })
        }
    }

    handleChange(value: string) {
        this.props.appStore._content = value;
        this.setState({
            markdown: value
        })
    }

    fileSelect = (file, fileList) => {
        console.log('fileSelect', file)
        const fileReader = new FileReader();
        fileReader.onload = event => {
            const {result} = event.target;
            console.log('fileSelect', result)
            this.setState({
                markdown: result
            })
        }
        fileReader.readAsText(file)
        return false;
    }

    handleSave(value: string) {
        const content = this.state.markdown;
        console.log('触发保存事件', content)
        if (content.length == 0) {
            return;
        }
        if (value) {
            this.interval = setInterval(() => this.tick(), 30000);
        }
        const formData = new FormData();
        formData.append('content', content);
        formData.append('isPrivate', false);
        formData.append('describe', this.state.describe);
        formData.append('title', this.state.title);
        formData.append('type', 0);
        formData.append('noteId', this.state.markId);
        request({
            url: '/api/notes/addNote',
            method: 'POST',
            body: formData
        })
            .then(data => {
                if (data) {
                    if (data.code == 200) {
                        if (value) {
                            message.success("保存成功")
                        } else {
                            message.success("已自动保存")
                        }
                    } else {
                        message.error("保存出错")
                    }
                    console.log('addNote : ' + JSON.stringify(data));
                }
            });
    }

    addImg($file: File) {
        message.error('暂不支持图片上传，请使用图片链接！');
        console.log($file)
    }

    onTitleChange(value: string) {
        console.log("onTitleChange", value);
        this.props.appStore._title = value;
        this.setState({
            title: value
        })
    }

    onTagChange(value: string) {
        this.props.appStore._tag = value;
        this.setState({
            tag: value
        })
    }

    onDescribeChange(value: string) {
        this.props.appStore._describe = value;
        this.setState({
            describe: value
        })
    }

    clearAll() {
        this.props.appStore.clearMarkdown();
        this.setState({
            markdown: '',
            title: '',
            tag: '',
            describe: ''
        })
    }

    render() {
        return (

            <div>

                <div id={'top'}>
                    <Input placeholder="标题" value={this.state.title} onChange={(value) => this.onTitleChange(value.target.value)}/>
                    <Input placeholder="标签" value={this.state.tag} onChange={(value) => this.onTagChange(value.target.value)}/>

                    <Button className={'top_button'} onClick={() => this.clearAll()}>新建</Button>
                    <Upload
                        fileList={[]}//已上传文件列表 设置空可不显示
                        beforeUpload={this.fileSelect}>
                        <Button
                            className={'top_button'}>
                            <Icon type="upload"/> 导入现有MD文档
                        </Button>
                    </Upload>

                    <Input className={'top_input_fill'} placeholder="简介" value={this.state.describe} onChange={(value) => this.onDescribeChange(value.target.value)}/>

                </div>

                <div>
                    {this.state.mobile && (//手机
                        <Editor
                            height="200px"
                            toolbar={{
                                h1: true,
                                h2: true,
                                h3: true,
                                save: true,
                                preview: true
                            }}
                            value={this.state.markdown}
                            subfield={false}
                            onChange={value => this.handleChange(value)}
                            onSave={value => this.handleSave(value)}
                        />
                    )}
                    {!this.state.mobile && (//电脑
                        <Editor
                            language="en"
                            height="700px"
                            value={this.state.markdown}
                            addImg={($file) => this.addImg($file)}
                            onChange={value => this.handleChange(value)}
                            onSave={value => this.handleSave(value)}
                        />
                    )}
                </div>

            </div>
        )

    }
}

export default MarkdownEdit;