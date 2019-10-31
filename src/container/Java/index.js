import React from 'react'
import CustomBreadcrumb from '../../component/CustomBreadcrumb/index'
import BlogList from "../../component/BlogList/BlogList";
import MarkdownShow from "../../component/Editer/ShowIndex";

class Java extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isContent: false,
            itemId: ''
        }
    }

    onItemClick(item) {
        console.log("onItemClick", item)
        this.setState({
            itemId: item.noteId,
            isContent: true
        })
    }

    onBackClick() {
        console.log("onBackClick")
        this.setState({
            isContent: false
        })
    }

    render() {
        if (this.state.isContent) {
            return (
                <div>
                    <MarkdownShow backClick={() => this.onBackClick()} itemId={this.state.itemId}/>
                </div>)
        } else {
            return (
                <div>
                    <CustomBreadcrumb arr={['Java']}/>
                    <BlogList itemClick={(item) => this.onItemClick(item)}/>
                </div>)

        }

    }
}

export default Java