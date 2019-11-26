import React from 'react'
import {Carousel} from 'antd'
import './style.css'

const imgs = [
  'https://vsharel.oss-cn-shenzhen.aliyuncs.com/blog/slide1.jpg',
  'https://vsharel.oss-cn-shenzhen.aliyuncs.com/blog/slide2.jpg',
  'https://vsharel.oss-cn-shenzhen.aliyuncs.com/blog/slide3.jpg',
]

class Home extends React.Component {
  render() {
    return (
      <div style={styles.bg} className='home'>
        <Carousel arrows effect='fade' className='size'>
          {imgs.map(item=><div key={item}><div className='size' style={{backgroundImage:`url(${item})`}}/></div>)}
          {/*不用img标签是因为图片大小会出现问题*/}
        </Carousel>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home