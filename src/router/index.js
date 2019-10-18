import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../component/Loading/LoadableComponent'
import PrivateRoute from './PrivateRoute'

//参数一定要是函数，否则不会懒加载，只会代码拆分

//主页
const Home = LoadableComponent(()=>import('../container/Home/index'));

//Java
const Java = LoadableComponent(()=>import('../container/Java/index'));

//Android
const Android = LoadableComponent(()=>import('../container/Android/index'));

//Web
const Web = LoadableComponent(()=>import('../container/Web/index'));

//markdown
const Markdown = LoadableComponent(()=>import('../container/Editer/index'));

// //授权显示
// const ImpowerShow = LoadableComponent(()=>import('../container/Impower/Show/index'));
//
// //添加授权
// const ImpowerAdd = LoadableComponent(()=>import('../container/Impower/Add/index'));
//
// //位置显示
// const Location = LoadableComponent(()=>import('../container/Location/index'));
//
// //反馈组件Demo
// const SpinDemo = LoadableComponent(()=>import('../container/Feedback/SpinDemo/index'));
// const ModalDemo = LoadableComponent(()=>import('../container/Feedback/ModalDemo/index'));
// const NotificationDemo = LoadableComponent(()=>import('../container/Feedback/NotificationDemo/index'));

//其它
const AnimationDemo = LoadableComponent(()=>import('../container/Other/AnimationDemo/index'));
const GalleryDemo = LoadableComponent(()=>import('../container/Other/GalleryDemo/index'));
const DraftDemo = LoadableComponent(()=>import('../container/Other/DraftDemo/index'));
const ChartDemo = LoadableComponent(()=>import('../container/Other/ChartDemo/index'));
const LoadingDemo = LoadableComponent(()=>import('../container/Other/LoadingDemo/index'));
const ErrorPage = LoadableComponent(()=>import('../container/Other/ErrorPage/index'));
const SpringText = LoadableComponent(()=>import('../container/Other/SpringText/index'));

//关于
const About = LoadableComponent(()=>import('../container/About/index'));

@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>

          <PrivateRoute exact path='/home' component={Home}/>

          <PrivateRoute exact path='/home/java' component={Java}/>
          <PrivateRoute exact path='/home/android' component={Android}/>
          <PrivateRoute exact path='/home/web' component={Web}/>
          <PrivateRoute exact path='/home/md' component={Markdown}/>

          {/*<PrivateRoute exact path='/home/impower/show' component={ImpowerShow}/>*/}
          {/*<PrivateRoute exact path='/home/impower/add' component={ImpowerAdd}/>*/}
          {/*<PrivateRoute exact path='/home/location' component={Location}/>*/}

          {/*<PrivateRoute exact path='/home/feedback/modal' component={ModalDemo}/>*/}
          {/*<PrivateRoute exact path='/home/feedback/notification' component={NotificationDemo}/>*/}
          {/*<PrivateRoute exact path='/home/feedback/spin' component={SpinDemo}/>*/}

          <PrivateRoute exact path='/home/other/animation' component={AnimationDemo}/>
          <PrivateRoute exact path='/home/other/gallery' component={GalleryDemo}/>
          <PrivateRoute exact path='/home/other/draft' component={DraftDemo}/>
          <PrivateRoute exact path='/home/other/chart' component={ChartDemo}/>
          <PrivateRoute exact path='/home/other/loading' component={LoadingDemo}/>
          <PrivateRoute exact path='/home/other/404' component={ErrorPage}/>
          <PrivateRoute exact path='/home/other/springText' component={SpringText}/>

          <PrivateRoute exact path='/home/about' component={About}/>

          <Redirect exact from='/' to='/home'/>

        </Switch>
      </div>
    )
  }
}

export default ContentMain