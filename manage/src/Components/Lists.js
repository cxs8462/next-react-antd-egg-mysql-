import React,{useState,useEffect} from 'react';
import { Button,List,Row,Col,message,Spin} from 'antd'
import 'antd/dist/antd.css'
import '../static/Components/Lists.css'
import axios from 'axios'
function Lists(props){
    const [data,setData] =useState([])
    const [issend,setIssend]=useState(false)
    const del=async id=>{
        setIssend(true)
        let res=await axios.post('http://175.24.111.110:7001/login/delArticle',{token:localStorage.getItem('token'),id:id})
        if(res.data.isres){
            message.success('删除成功')
            setIssend(false)
        }else{
            message.error('删除失败')
            setIssend(false)
        }
        getData()
    }
    const getData= async()=>{
        let res=await axios.post('http://175.24.111.110:7001/login/getArticle',{token:localStorage.getItem('token')})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            setData(res.data)
        }
    }
    useEffect(()=>{
        getData() 
    },[])
    return(
        <div className='lists-box'>
            <Spin spinning={issend}>
            <List
            header={<div>
            <Row>
                <Col span='9'>文章名</Col>
                <Col span='5'>分类</Col>
                <Col span='5'>时间</Col>
                <Col span='5'>操作</Col>
            </Row>
        </div>}
            bordered
            dataSource={data}
            renderItem={(item,index) => (
                <List.Item>
                    <Row style={{width:'100%'}}>
                         <Col span='9'>{item.title}</Col>
                         <Col span='5'>{item.typeName}</Col>
                        <Col span='5'>{item.time}</Col>
                         <Col span='5'>
                        <div className='list-btn'>
                            <Button onClick={()=>{del(item.id)}} type='danger'>删除</Button>
                        </div>
                     </Col>
                    </Row>
                </List.Item>
            )}
            />
            </Spin>
        </div>
    )
}
 
export default Lists;