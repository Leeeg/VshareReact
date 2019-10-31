import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import MarkdownEdit from "../../component/Editer/EditIndex";

export default class Markdown extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['Md']}/>
                <MarkdownEdit/>
            </div>
        )
    }
}