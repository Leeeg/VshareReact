import React, {Component} from 'react';
import Editor from 'for-editor'
import request from "../../api/Net";
import {Button, Icon, Upload, message} from 'antd';


class MarkdownEdit extends Component {

    state = {
        markdown: '',
        mobile: false
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', () => {
            this.resize()
        })

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
        console.log('触发保存事件', value)
        const formData = new FormData();
        formData.append('content', value);
        formData.append('isPrivate', false);
        formData.append('title', 'react测试1');
        formData.append('type', 0);
        request({
            url: '/api/notes/addNote',
            method: 'POST',
            body: formData
        })
            .then(data => {
                if (data) {
                    console.log('addNote : ' + JSON.stringify(data));
                }
            });
    }

    addImg($file: File) {
        message.error('暂不支持图片上传，请使用图片链接！');
        console.log($file)
    }

    render() {
        return (

            <div>

                <Upload
                    fileList={[]}//已上传文件列表 设置空可不显示
                    beforeUpload={this.fileSelect}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>

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