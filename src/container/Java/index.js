import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import TypingCard from '../../component/TypingCard'

export default class Java extends React.Component{
  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['Java']}/>
        <TypingCard source={'Java文档'} title='Java' />
      </div>
    )
  }
}