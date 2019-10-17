import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
    {
        title: '首页',
        icon: 'home',
        key: '/home'
    },
    {
        title: 'Java',
        icon: 'home',
        key: '/home/java'
    },
    {
        title: 'Android',
        icon: 'home',
        key: '/home/android'
    },
    {
        title: 'Web',
        icon: 'home',
        key: '/home/web'
    },
    {
        title: '写博客',
        icon: 'home',
        key: '/home/md'
    },

    // {
    //   title: '授权管理',
    //   icon: 'check-circle',
    //   key: '/home/impower',
    //   subs: [
    //     {key: '/home/impower/show', title: '查看', icon: '',},
    //     {key: '/home/impower/add', title: '添加', icon: '',},
    //   ]
    // },
    //  {
    //       title: '位置信息',
    //       icon: 'environment',
    //       key: '/home/location',
    //  },
    // {
    //   title: '输入组件',
    //   icon: 'edit',
    //   key: '/home/entry',
    //   subs: [
    //     {
    //       key: '/home/entry/form',
    //       title: '表单',
    //       icon: '',
    //       subs: [
    //         {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
    //         {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
    //       ]
    //     },
    //     {key: '/home/entry/upload', title: '上传', icon: ''},
    //   ]
    // },
    // {
    //   title: '反馈组件',
    //   icon: 'message',
    //   key: '/home/feedback',
    //   subs: [
    //     {key: '/home/feedback/modal', title: '对话框', icon: '',},
    //     {key: '/home/feedback/notification', title: '通知提醒框', icon: ''},
    //     {key: '/home/feedback/spin', title: '加载中', icon: '',}
    //   ]
    // },

    {
        title: '其他',
        icon: 'bulb',
        key: '/home/other',
        subs: [
            // {key: '/home/other/animation', title: '动画', icon: '',},
            {key: '/home/other/gallery', title: '画廊', icon: '',},
            {key: '/home/other/draft', title: '富文本', icon: ''},
            {key: '/home/other/chart', title: '图表', icon: ''},
            // {key:'/home/other/loading',title:'加载动画',icon:''},
            {key: '/home/other/404', title: '404', icon: ''},
            {key: '/home/other/springText', title: '弹性文字', icon: ''},
        ]
    },
    {
        title: '关于',
        icon: 'info-circle-o',
        key: '/home/about'
    }
];

class SiderNav extends React.Component {

    render() {

        return (
            <div style={{height: '100vh', overflowY: 'scroll'}}>
                <div style={styles.logo}></div>
                <CustomMenu menus={menus}/>
            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    }
};

export default SiderNav