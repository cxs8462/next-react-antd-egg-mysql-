import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import { Row, Col,Breadcrumb,BackTop} from 'antd'
import {HomeOutlined,FileTextOutlined} from '@ant-design/icons'
import dy from 'next/dynamic'
const Footer = dy(import('../components/Footer'))
const Header = dy(import('../components/Header'))
const Myself = dy(import('../components/Myself'))
const Lists = dy(import('../components/Lists'))
import axios from 'axios'
import {CSSTransition} from 'react-transition-group'

function MainLists(data){
    const alist=data.data
    const [inout,setInout]=useState(false)
      useEffect(()=>{
        setInout(true)
      },[])
  return(
    <div>
      <Head>
        <title>文章列表</title>
      </Head>
      <Header keys='article'/>
      <CSSTransition
           in={inout}
            classNames='fade'
            timeout={1000}
            unmountOnExit={true}
            >
      <Row className='comm-main'  type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={13} xl={13}>
          <Breadcrumb>
            <Breadcrumb.Item href='/'>
              <HomeOutlined />
              <span>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FileTextOutlined />
              <span>所有文章</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Lists List={alist} name='所有文章'></Lists>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={5} lg={5} xl={5}>
          <Myself></Myself>
        </Col>
      </Row>
      </CSSTransition>
      <Footer></Footer>
      <BackTop/>
    </div>
  )
}
MainLists.getInitialProps=async ()=>{
  const data=await axios.get('http://175.24.111.110:7001/getArticlelist')
  return data.data
}
export default MainLists
