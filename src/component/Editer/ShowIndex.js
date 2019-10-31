import React, {Component} from 'react';
import Editor from 'for-editor'
import request from "../../api/Net";
import {Button, Icon} from "antd";
import style from './ShowStyle.css'

class MarkdownShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            mobile: false
        }
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', () => {
            this.resize()
        })

        document.documentElement.scrollTop = 0

        const itemId = this.props.itemId
        console.log("props", itemId)

        request({
            url: '/api/notes/getNotesById?ids=' + itemId,
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    console.log('getNotesById : ' + JSON.stringify(data));
                    if (data.code == 200 && data.data){
                        this.setState({
                            value: data.data[0].noteContent
                        })
                    }
                }
            });
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

    render() {
        return (
            <div >
                <Button className={'backBt'} type="primary" onClick={()=>this.props.backClick()}>
                    <Icon type="left" />
                    Go back
                </Button>
                <div>
                    {this.state.mobile && (//手机
                        <Editor
                            height="500px"
                            toolbar={{
                                h1: true,
                                h2: true,
                                h3: true,
                                save: true,
                                preview: true
                            }}
                            value={this.state.value}
                            subfield={false}
                        />
                    )}
                    {!this.state.mobile && (//电脑
                        <Editor
                            height="800px"
                            toolbar={{
                            }}
                            preview={true}
                            language="en"
                            value={this.state.value}
                        />
                    )}
                </div>

            </div>
        )

    }
}

export default MarkdownShow;