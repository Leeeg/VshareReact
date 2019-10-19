import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import BlogList from "../../component/BlogList/Index";

export default class Java extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['Java']}/>
                <BlogList/>
            </div>
        )
    }
}