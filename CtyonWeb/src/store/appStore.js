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
}

export default new AppStore()