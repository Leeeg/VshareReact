import {List} from 'antd';
import React, {Component} from 'react';
import TypingCard from "../TypingCard";
import request from "../../api/Net";
import {Link, withRouter} from "react-router-dom";
import style from './style.css'
import {inject} from "mobx-react";

@withRouter @inject('appStore')
class BlogList extends Component {

    constructor(props){
        super(props);
        this.state = {
            listData: [],
            path:''
        }
    }

    componentDidMount(): void {
        this.setState({
            path:this.props.location.pathname
        })
        console.log("props", this.props)

        request({
            url: '/api/notes/getNotesList',
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    if (data.code == 200) {
                        this.setState({
                            listData: data.data
                        })
                    }
                    console.log('getNotesList : ' + JSON.stringify(data));
                }
            });
    }

    render() {
        return (
            <div>

                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                            document.documentElement.scrollTop = 0
                        },
                        pageSize: 10,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                            <div onClick={() => this.props.itemClick(item)}>
                                {/*<Link to={this.state.path}></Link>*/}
                                <TypingCard source={item.noteDescribe} title={item.noteTitle}/>
                            </div>

                    )}
                />

            </div>
        )
    }

}

export default BlogList;
