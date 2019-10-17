import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import TypingCard from '../../component/TypingCard'

export default class About extends React.Component{
  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['关于']}/>
        <TypingCard source={'Vshare是一个开放的技术分享平台'} title='关于' />
      </div>
    )
  }
}