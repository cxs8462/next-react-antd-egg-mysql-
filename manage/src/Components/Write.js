import React,{useState,useEffect} from 'react';
import {Row,Col, Input, Select, Button,message,Spin} from 'antd'
import '../static/Components/Write.css'
import 'antd/dist/antd.css'
import marked from 'marked'
import highlight from 'highlight.js'
import axios from 'axios'
const {Option}=Select
const {TextArea}=Input
function Write(props) {
    const renderer=new marked.Renderer()
    marked.setOptions({
      renderer:renderer,
      gfm:true,
      pedantic:false,
      sanitize:false,
      tables:true,
      breaks:false,
      smartLists:true,
      highlight:function(code){
        return highlight.highlightAuto(code).value
      }
    })
    const [typelist,setTypelist]=useState([])
    const [typeid,setTypeid]=useState(1)
    const [operate,setOperate]=useState(0)
    const [title,setTitle]=useState('')
    const [introduce,setIntroduce]=useState('')
    const [intmar,setIntmar]=useState('')
    const [content,setContent]=useState('')
    const [contentmar,setContentmar]=useState('')

    const [artid,setArtid]=useState('请选择文章')
    const [artdata,setArtdata]=useState([])

    const [issend,setIssend]=useState(false)


    const edit=(value,name)=>{
        switch (name){
            case 'introduce':
                setIntroduce(value)
                setIntmar(marked(value))
                break
            case 'title':
                setTitle(value)
                break
            case 'content':
                setContent(value)
                setContentmar(marked(value))
                break
            case 'typeid':
                setTypeid(value)
                break
        }
    }
    const clear=()=>{
        setTitle('')
        setIntroduce('')
        setIntmar('')
        setContent('')
        setContentmar('')
    }
    useEffect(()=>{
        getType()
        getArticle()
    },[])
    const getType= async()=>{
        let res=await axios.post('http://175.24.111.110:7001/login/getType',{token:localStorage.getItem('token')})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            setTypelist(res.data)
            setTypeid(res.data[0].Id)
        }
    }
    const getArticle= async()=>{
        let res=await axios.post('http://175.24.111.110:7001/login/getArticle',{token:localStorage.getItem('token')})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            setArtdata(res.data)
        }
    }
   const newArt=(value,o)=>{
        setOperate(o.value)
        if(o.value==0){
            clear()
        }
   }
   const getArticleId=async (id)=>{
       setIssend(true)
       setArtid(id)
    let res=await axios.post('http://175.24.111.110:7001/login/getArticleId',{token:localStorage.getItem('token'),id:id})
    if(res.data.data=='没有登录'){
        message.error('登录失效')
        props.history.push('/')
    }else{
        console.log(res.data)
        setTitle(res.data[0].title)
        setIntroduce(res.data[0].introduce)
        setIntmar(marked(res.data[0].introduce))
        setContent(res.data[0].content)
        setContentmar(marked(res.data[0].content))
        setTypeid(res.data[0].typeid)
        setIssend(false)
    }

   }
   const submib=async()=>{
    setIssend(true)
       if(title==''||introduce==''||content==''||typeid==''){
           message.error('不能有空')
           setIssend(false)
           return ''
       }
       let data={title,introduce,content,type_id:typeid,time:new Date().getTime().toString().substr(0,10)}
       if(operate==0){
        let res=await axios.post('http://175.24.111.110:7001/login/addArticle',{token:localStorage.getItem('token'),data:data})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            clear()
            setIssend(false)
            message.success('添加文章成功')
        }
       }else if(operate==1){
           data.id=artid
        let res=await axios.post('http://175.24.111.110:7001/login/updataArticle',{token:localStorage.getItem('token'),data:data})
        if(res.data.data=='没有登录'){
            message.error('登录失效')
            props.history.push('/')
        }else{
            setOperate(0)
            clear()
            setIssend(false)
            message.success('修改文章成功')
        }
       }
   }
    return(
        <div className='write-box'>
            <Spin spinning={issend}>
            <Row>
                <Col span='8'>
                    <Input value={title} onChange={(e)=>{edit(e.target.value,'title')}} addonBefore='标题' placeholder='文章标题' />
                </Col>
                <Col offset='1' span='3'> 
                    <label>分类：</label>
                    <Select value={typeid} onChange={(e)=>{edit(e,'typeid')}}  placeholder='请选择分类'>
                        {typelist.map((item,index)=>{
                            return(
                                <Option key={item.type_name+index} value={item.Id}>{item.type_name}</Option>
                            )
                        })}
                    </Select>
                </Col>
                <Col span='6' offset='1'>
                    <Select style={{marginRight:'1rem'}}  value={operate} onSelect={(value,o)=>{newArt(value,o)}}>
                        <Option value={0}>新建文章</Option>
                        <Option value={1}>编辑文章</Option>
                    </Select>
                    <Select style={operate==0?{display:'none'}:{}} onChange={(value)=>{getArticleId(value)}} value={artid}>
                        {artdata.map((item)=>{
                            return (
                                <Option key={item.title} value={item.id}>{item.title}</Option>
                            )
                        })}
                    </Select>
                </Col>
                <Col offset='1' span='2'>
                    <Button onClick={clear}>清空</Button>
                </Col>
                <Col offset='0.5' span='2'>
                    <Button type='primary' onClick={submib}>提交</Button>
                </Col>
            </Row>
            <Row className='write-row2'>
                <Col span='11'>
                    <TextArea onChange={(e)=>{edit(e.target.value,'introduce')}} value={introduce} placeholder='简介'  autoSize={{minRows: 6}}></TextArea>
                </Col>
                <Col span='11' offset='1'>
                  <div className='write-intmar' dangerouslySetInnerHTML={{__html:intmar}}></div>
                </Col>
            </Row>
            <Row className='write-row3'>
                <Col span='11'>
                    <TextArea value={content} onChange={(e)=>{edit(e.target.value,'content')}} placeholder='文章' autoSize={{minRows: 15}}></TextArea>
                </Col>
                <Col span='11' offset='1'>
                    <div className='write-contentmar' dangerouslySetInnerHTML={{__html:contentmar}}></div>
                </Col>
            </Row>
            </Spin>
        </div>
    )
}
export default Write