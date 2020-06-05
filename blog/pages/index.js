import React from 'react'
import Head from 'next/head'
import { Row, Col,Breadcrumb,BackTop} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import dy from 'next/dynamic'
const Footer = dy(import('../components/Footer'))
const Header = dy(import('../components/Header'))
const Myself = dy(import('../components/Myself'))
const Lists = dy(import('../components/Lists'))
import '../static/style/pages/index.css'
import axios from 'axios'
import Link from 'next/link'



function App(getData){
  const data=getData.data
  return(
    <div>
      <Head>
        <title>博客</title>
      </Head>
      <Header keys='home'/>
      <Row className='comm-main'  type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={13} xl={13}>
          <Breadcrumb >
            <Breadcrumb.Item>
            <HomeOutlined />
              <Link  href='/'>
                <span>Home</span>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Lists List={data} name='最新文章'></Lists>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={5} lg={5} xl={5}>
          <Myself/>
        </Col>
      </Row>
      <Footer/>
      <BackTop />
    </div>
  )
}
App.getInitialProps=async()=>{
  const data=await axios.get('http://175.24.111.110:7001/getArticleIndex')
  return data.data
}
export default App
