import '../static/style/components/Header.css'
import {Row,Col,Menu,Affix} from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import Router from 'next/router'
import {HomeOutlined,FileTextOutlined,TeamOutlined,GlobalOutlined} from '@ant-design/icons'
import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios'
import Link from 'next/link'

const Header=function(props){
    let [data,setData]=useState([{ini:'blog'},{ini:'首页'},{ini:'文章'},{ini:'blog'}])
    let scroll=useRef() 
    useEffect(()=>{
        console.log(scroll)
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',scrollFunc,false);
            }//W3C
            window.onmousewheel=document.onmousewheel=scrollFunc;
        function scrollFunc(e){
            e=e || window.event;
            if(e.wheelDelta){//IE/Opera/Chrome
                //自定义事件：编写具体的实现逻辑
                if(e.wheelDelta>0){
                    scroll.current.style.opacity=1
                }else if(e.wheelDelta<0){
                    scroll.current.style.opacity=0
                }
            }else if(e.detail){//Firefox
                //自定义事件：编写具体的实现逻辑
                
            }
        }
        const get=async()=>{
            let res=await axios.get('http://175.24.111.110:7001/getArticleHead')
            setData(res.data.data)
        }
        get()
    },[])
    function goto(url){
        Router.push(url)
    }
    return (
        <Affix offsetTop={1}>
        <div className='header'  ref={scroll}>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className='header-logo'><GlobalOutlined /></span>
                    <span className='header-txt'>{data[0].ini}</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode='horizontal' selectedKeys={props.keys}>
                        <MenuItem key='home'>
                            <HomeOutlined />
                            <Link prefetch  href='/'>
                               {data[1].ini}
                            </Link>
                        </MenuItem>
                        <MenuItem key='article'>
                            <FileTextOutlined/>
                            <Link prefetch  href='/list'>
                               {data[2].ini}
                            </Link>
                        </MenuItem>
                        <MenuItem key='liuyan' disabled>
                            <TeamOutlined />{data[3].ini}
                        </MenuItem>
                    </Menu>
                </Col>
            </Row>
        </div>
        </Affix>
    )
}
export default Header