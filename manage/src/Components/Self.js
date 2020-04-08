import React,{useState, useEffect} from 'react';
import { List, Card, Button,Modal, Input,message,Spin } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

function Self(props){
    const title = [ '背景','头像','欢迎语','QQ','Wechat','github',]
    const [data,setData]=useState([])
    const [visible,setVisible]=useState(false)
    const [motitle,setMotitle]=useState('')
    const [id,setId]=useState(1)
    const [inputvalue,setInputvalue]=useState('')
    const [issend,setIssend]=useState(false)
    const set=(item,index)=>{
      if(index<2) setMotitle('请输入图片地址')
      else setMotitle('请输入文字')
      setInputvalue(item.data)
      setId(item.Id)
      setVisible(true)
    }
    const submit=async()=>{
      let data={id:id,data:inputvalue}
      setVisible(false)
      setIssend(true)
        let res=await axios.post('http://175.24.111.110:7001/login/updataPer',{token:localStorage.getItem('token'),data:data})
        if(res.data.isres){
            message.success('修改成功')
            setIssend(false)
        }else{
            message.error('修改失败')
            setIssend(false)
        }
        getData()
    }
    const getData= async()=>{
      let res=await axios.post('http://175.24.111.110:7001/login/getPer',{token:localStorage.getItem('token')})
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
    return (
        <div style={{textAlign:'center'}}>
          <Spin spinning={issend}>
            <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item,index) => (
            <List.Item>
              <Card title={title[index]}>
                {index<2?<img style={{width:'90%',marginBottom:'1rem'}} src={item.data}></img>:<p>{item.data}</p>}
                <Button onClick={()=>{set(item,index)}}>修改</Button>
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
export default Self