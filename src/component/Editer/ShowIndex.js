import React, {Component} from 'react';
import Editor from 'for-editor'
import request from "../../api/Net";


class MarkdownShow extends Component {

    state = {
        value: '',
        mobile: false
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', () => {
            this.resize()
        })

        request({
            url: '/api/notes/getNotesById?ids=' + 10,
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    console.log('getNotesById : ' + JSON.stringify(data));
                    this.setState({
                        value: data.data[0].noteContent
                    })
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
            <div>
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