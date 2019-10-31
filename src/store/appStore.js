import {observable, action} from 'mobx'
import {isAuthenticated, authenticateSuccess, logout} from '../util/Session'

class AppStore {
    @observable isLogin = !!isAuthenticated();  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
    @observable users = [];//用户数据
    @observable loginUser = {};  //当前登录用户信息
    @observable impowers = [];//授权数据

    @action toggleLogin(flag, info = {}) {
        this.loginUser = info;  //设置登录用户信息
        if (flag) {
            authenticateSuccess(info.username);
            this.isLogin = true
        } else {
            logout();
            this.isLogin = false
        }

    }

    @action initUsers() {
        const localUsers = localStorage['users'] ? JSON.parse(localStorage['users']) : [];
        this.users = [{username: 'admin', password: 'admin'}, ...localUsers]
    }

    @action setImpowers(impowers) {
        this.impowers = impowers
    }


    //上次编辑的博客
    @observable _content = '';//内容
    @observable _title = '新建Markdown';//标题
    @observable _tag = '';//标签
    @observable _describe = '';//描述
    @observable _markId = '';//id

    @action setContent(value: string) {
        this._content = value;
    }

    @action setTitle(value: "") {
        this._title = value;
    }

    @action setTag(value: "") {
        this._tag = value;
    }

    @action setDescribe(value: "") {
        this._describe = value;
    }

    @action setMarkId(value: "") {
        this._markId = value;
    }

    @action clearMarkdown() {
        this._title = '新建Markdown';
        this._tag = '';
        this._content = '';
        this._describe = '';
        this._markId = '';
    }

}

export default new AppStore()