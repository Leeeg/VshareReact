import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import TypingCard from '../../component/TypingCard'

export default class About extends React.Component{

    componentDidMount() {

        document.documentElement.scrollTop = 0

    }
        render(){
    return (
      <div>
        <CustomBreadcrumb arr={['Web']}/>
        <TypingCard source={'Web相关'} title='Web' />
      </div>
    )
  }
}