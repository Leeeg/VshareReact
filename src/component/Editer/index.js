import React, {Component} from 'react';
import Editor from 'for-editor'
// import Editor from './dist'

class MarkdownEdit extends Component {

    state = {
        value: '',
        mobile: false
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', () => {
            this.resize()
        })
        setTimeout(() => {
            this.setState({
                // value
            })
        }, 200)
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
            value: value
        })
    }

    handleSave(value: string) {
        console.log('触发保存事件', value)
    }

    addImg($file: File) {

        console.log($file)
    }

    render() {
        return (

            <div>
                <div>
                    {this.state.mobile && (
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
                            onChange={value => this.handleChange(value)}
                            onSave={value => this.handleSave(value)}
                        />
                    )}
                    {!this.state.mobile && (
                        <Editor
                            language="en"
                            height="700px"
                            value={this.state.value}
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