import React, {Component} from 'react';
import Editor from 'for-editor'
import ReactDom from 'react-dom';
import ReactMarkdown from 'react-markdown';

const input = '# for-editor\n' +
    '## Header 2\n' +
    '### Header 3\n' +
    '#### Header 4\n' +
    '##### Header 4\n' +
    '\n' +
    '---\n' +
    '\n' +
    '![alt](https://ctyon.oss-cn-shenzhen.aliyuncs.com/react/slide4.jpg)'

class MarkdownEdit2 extends Component {

    render() {
        return (

            <div>
                <ReactMarkdown source={input}/>
            </div>
        )

    }
}

export default MarkdownEdit2;