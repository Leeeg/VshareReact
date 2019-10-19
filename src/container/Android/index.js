import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import TypingCard from '../../component/TypingCard'
import MarkdownShow from "../../component/Editer/ShowIndex";

export default class Android extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['Android']}/>
                <TypingCard source={'Android文档'} title='Android'/>
                <MarkdownShow/>
            </div>
        )
    }
}