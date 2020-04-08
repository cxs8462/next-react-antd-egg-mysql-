import React,{useState, useEffect} from 'react';
import { List, Card, Button,Modal, Input,message,Spin } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

function Type(props){
    const [data,setData]=useState([])
    const [visible,setVisible]=useState(false)
    const [issend,setIssend]=useState(false)
    const [motitle,setMotitle]=useState('请输入分类')
    const [id,setId]=useState(1)
    const [inputvalue,setInputvalue]=useState('')
    const [newdata,setNewdata]=useState('')
    const set=(item)=>{
      setInputvalue(item.type_name)
      setId(item.Id)
      setVisible(true)
    }
    const del=async(id)=>{
        setIssend(true)
        let res=await axios.post('http://175.24.111.110:7001/login/delType',{token:localStorage.getItem('token'),id:id})
        if(res.data.isres){
            message.success('删除成功')
            setIssend(false)
        }else{
            message.error('删除失败')
            setIssend(false)
        }
        getType()
      }
    const submit=async()=>{
      let data={id:id,type_name:inputvalue}
      setVisible(false)
      setIssend(true)
        let res=await axios.post('http://175.24.111.110:7001/login/updataType',{token:localStorage.getItem('token'),type:data})
        if(res.data.isres){
            message.success('修改成功')
            setIssend(false)
        }else{
            message.error('修改失败')
            setIssend(false)
        }
        getType()
    }
    const setNew=e=>{
        setNewdata(e.target.value)
    }
    const create=async()=>{
        setIssend(true)
        if(newdata!=''){
        let res=await axios.post('http://175.24.111.110:7001/login/addType',{token:localStorage.getItem('token'),type:newdata})
        if(res.data.isres){
            message.success('添加成功')
            setIssend(false)
        }else{
            message.error('添加失败')
            setIssend(false)
        }
        }
        getType()
    }
    const getType= async()=>{
        let res=await axios.post('http://175.24.111.110:7001/login/getType',{token:localStorage.getItem('token')})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            setData(res.data)
        }
    }
    useEffect(()=>{
        getType() 
    },[])
    return (
        <div style={{textAlign:'center'}}>
            <Spin spinning={issend}>
            <Card title='新建分类' style={{textAlign:'center'}}>
                <input style={{marginRight:'1rem'}}  onChange={(e)=>{setNew(e)}}></input>
                <Button onClick={()=>{create()}}>新建</Button>
            </Card>
            <List
             style={{marginTop:'1rem'}} 
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item,index) => (
                <List.Item>
                <Card title={'分类'+(index+1)}>
                    <p>{item.type_name}</p>
                    <Button style={{marginRight:'1rem'}} type='primary' onClick={()=>{set(item)}}>修改</Button>
                    <Button type='danger' onClick={()=>{del(item.Id)}}>删除</Button>
                </Card>
                </List.Item>
            )}
            />
        <Modal
          title={motitle}
          visible={visible}
          onOk={submit}
           onCancel={()=>{setVisible(false)}}
        >
          <Input value={inputvalue} onChange={(e)=>{setInputvalue(e.target.value)}}></Input>
        </Modal>
        </Spin>
        </div>
    )
    
}

export default Type