import React,{useState,useEffect} from 'react';
import { List, Card, Button,Modal,Input,message,Spin } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

function SetHead(props){
  const [visible,setVisible]=useState(false)
  const [id,setId]=useState(1)
  const [inputvalue,setInputvalue]=useState('')
  const [issend,setIssend]=useState(false)

    const title = ['网站名','链接1','链接2','链接3']
    const [data,setData]=useState([{Id:1,ini:'blog'},{Id:2,ini:'blosdfg'},{Id:3,ini:'blsog'},{Id:4,ini:'ablog'}])
    const set=(item)=>{
      setInputvalue(item.ini)
      setId(item.Id)
      setVisible(true)
    }
    const submit=async()=>{
      let data={id:id,ini:inputvalue}
      setVisible(false)
      let res=await axios.post('http://175.24.111.110:7001/login/updataHead',{token:localStorage.getItem('token'),data:data})
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
      let res=await axios.post('http://175.24.111.110:7001/login/getHead',{token:localStorage.getItem('token')})
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
                <p>{item.ini}</p>
                <Button onClick={()=>{set(item)}}>修改</Button>
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title='请输入'
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
export default SetHead