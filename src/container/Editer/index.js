import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import MarkdownEdit from "../../component/Editer";
import MarkdownEdit2 from "../../component/Editer/index2";

export default class Markdown extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['Md']}/>
                <MarkdownEdit/>
                <MarkdownEdit2/>
            </div>
        )
    }
}