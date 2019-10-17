import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import MarkdownEdit from "../../component/Markdown";
import MarkdownEdit2 from "../../component/Markdown/index2";
import App from "../../component/Markdown/app";

export default class Markdown extends React.Component{
  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['Md']}/>
          {/*<App/>*/}
        {/*  <MarkdownEdit/>*/}
        {/*<MarkdownEdit2/>*/}
      </div>
    )
  }
}