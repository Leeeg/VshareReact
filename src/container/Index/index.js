import React from 'react'
import {Layout, Affix} from 'antd'
import SiderNav from '../../component/SiderNav'
import ContentMain from '../../router/index'
import HeaderBar from '../../component/HeaderBar'
import {withRouter} from "react-router-dom";

const {Sider, Header, Content, Footer} = Layout;

class Index extends React.Component {

    state = {
        collapsed: false
    };

    toggle = () => {
        // console.log(this)  状态提升后，到底是谁调用的它
        this.setState({
            collapsed: !this.state.collapsed
        })
    };

    render() {
        // 设置Sider的minHeight可以使左右自适应对齐
        return (
            <div id='page'>
                <Layout>
                    <Affix>
                        <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
                            <SiderNav/>
                        </Sider>
                    </Affix>
                    <Layout>
                        <Header style={{background: '#fff', padding: '0 16px'}}>
                            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
                        </Header>
                        <Content>
                            <ContentMain/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Vshare 属于大家的技术分享网站
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index