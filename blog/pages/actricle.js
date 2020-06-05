import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import { Row, Col,Breadcrumb,Affix,BackTop} from 'antd'
import {UnorderedListOutlined,FileProtectOutlined,FieldTimeOutlined,HomeOutlined,FileTextOutlined} from '@ant-design/icons'
import dy from 'next/dynamic'
const Footer = dy(import('../components/Footer'))
const Header = dy(import('../components/Header'))
const Myself = dy(import('../components/Myself'))
const Marnav = dy(import('markdown-navbar'))
import '../static/style/pages/index.css'
import '../static/style/pages/actricle.css'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import heighli from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Link from 'next/link'
import {CSSTransition} from 'react-transition-group'

function Actricle(props){
  const data=props
  const renderer=new marked.Renderer()
  const [inout,setInout]=useState(false)
  useEffect(()=>{
    setInout(true)
  },[])

  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    highlight:function(code){
      return heighli.highlightAuto(code).value
    }
  })
  let Mar=marked(data.content)
  return(
    <div className='art-page'>
      <Head>
        <title>文章</title>
      </Head>
      <Header/>
      <CSSTransition
           in={inout}
            classNames='fade'
            timeout={1000}
            unmountOnExit={true}
            >
      <Row className='comm-main'  type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={13} xl={13}>
        <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
              <Link prefetch  href='/'>
                <a>Home</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FileTextOutlined />
              <Link prefetch  href='/list'>
                <a>所有文章</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
            <FileProtectOutlined />
                <a>文章页</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='art'>
            <h1 className='art-title'>{data.title}</h1>
            <p className='art-tag'>
              <span><FieldTimeOutlined />{data.time}</span>
              <span><UnorderedListOutlined />{data.typeName}</span>
            </p>
            <div className='art-content' dangerouslySetInnerHTML={{__html:Mar}}></div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={5} lg={5} xl={5}>
          <Myself/>
          <Affix offsetTop={10}>
            <div className='art-nav'>
              <div className='nav-title'><p>章节列表列表</p></div>
              <Marnav
              source={data.content}
              className='art-menu'
              ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      </CSSTransition>
      <Footer/>
      <BackTop/>
    </div>
  )
}
Actricle.getInitialProps=async props=>{
  let id=props.query.id
  let data=await axios.get('http://175.24.111.110:7001/getArticleById',{params:{id:id}})
  return data.data.data[0]
}
export default Actricle
