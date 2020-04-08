import React,{useState,useEffect} from 'react';
import Write from '../Components/Write'
import SetHead from '../Components/SetHead'
import Self from '../Components/Self'
import Lists from '../Components/Lists'
import Type from '../Components/Type'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Route } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

function AdminIndex (props){
    const [collapsed,setCollapsed]=useState(false)
    const [titletag,setTitletag]=useState('编辑or新建文章')
    const [key,setKey]=useState('1')
    const onCollapse = () => {
    setCollapsed(!collapsed);
  }
  useEffect(()=>{
      switch (props.history.location.pathname){
        case '/admin':
          setKey('1')
          break
        case '/admin/sethead':
          setKey('2')
          break
        case '/admin/setself':
          setKey('3')
          break
        case '/admin/lists':
          setKey('4')
          break
        case '/admin/settype':
          setKey('5')
          break
          
      }
  },[])
  const Togo=(key)=>{
      setKey(key)
      switch(key){
        case '1':
            setTitletag('编辑or新建文章')
            props.history.push('/admin')
            break
        case '2':
            setTitletag('网站头部编辑')
            props.history.push('/admin/sethead')
            break
        case '3':
            setTitletag('个人信息')
            props.history.push('/admin/setself')
            break
        case '4':
            setTitletag('全部文章')
            props.history.push('/admin/lists')
            break
        case '5':
            setTitletag('分类管理')
            props.history.push('/admin/settype')
            break
      }
  }


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu  defaultSelectedKeys={key} selectedKeys={key} mode="inline">
            <Menu.Item key="1" onClick={(e)=>{Togo(e.key)}}>
              <PieChartOutlined />
              <span>写文章</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={(e)=>{Togo(e.key)}}>
              <DesktopOutlined />
              <span>网站头部设置</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={(e)=>{Togo(e.key)}}>
                <UserOutlined />
                <span>个人信息</span>
             </Menu.Item>
             <Menu.Item key="4" onClick={(e)=>{Togo(e.key)}}>
              <FileOutlined />
              <span>全部文章</span>
            </Menu.Item>
             <Menu.Item key="5" onClick={(e)=>{Togo(e.key)}}>
                <TeamOutlined />
                <span>分类管理</span>
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout  className="site-layout">
          <Header  className="site-layout-background" style={{background:'#fff', padding: 0 }}>
            <Breadcrumb  style={{ margin: '16px 16px',fontSize:'20px',color:'rgba(36, 170, 223, 0.726)' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{titletag}</Breadcrumb.Item>
            </Breadcrumb>
          </Header>
          <Content  style={{ margin: '1rem 1rem' }}>
            <div className="site-layout-background" style={{  minHeight: 360 }}>
              <Route path='/admin' exact component={Write}></Route>
              <Route  path='/admin/sethead' exact component={SetHead}></Route>
              <Route path='/admin/setself' exact component={Self}></Route>
              <Route path='/admin/lists' exact component={Lists}></Route>
              <Route path='/admin/settype' exact component={Type}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>使用React+Antd搭建</Footer>
        </Layout>
      </Layout>
    )
  }
  export default AdminIndex

