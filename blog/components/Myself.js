import React,{useState,useEffect} from 'react'
import { Card,Tooltip,Avatar } from 'antd'
import {QqOutlined,GithubOutlined,WechatOutlined} from '@ant-design/icons'
import axios from 'axios'
import '../static/style/components/Myself.css'
const Myself=()=>{
    const [data,setData]=useState([
        {data:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
        {data:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {data:'welcome'},
        {data:'1296787743'},
        {data:'cxs8462'},
        {data:'github'}
    ])
    useEffect(()=>{
        const get=async()=>{
            let res=await axios.get('http://175.24.111.110:7001/getArticleContact')
            setData(res.data.data)
        }
        get()
    },[])
    return(
        <div className='self-box'>
            <Card className='self-main'cover={
            <img style={{height:'5rem'}}
            src={data[0].data}
            />
            }>
                <img className='self-icon' src={data[1].data}></img>
                <div className='self-text'>{data[2].data}</div>
            </Card>
            <div>
                <Tooltip arrowPointAtCenter title={data[3].data} className='self-touch'>
                <Avatar  icon={<QqOutlined />} />
                </Tooltip>
                <Tooltip arrowPointAtCenter title={data[4].data} className='self-touch'>
                <Avatar  icon={<WechatOutlined />} />
                </Tooltip>
                <Tooltip arrowPointAtCenter title={data[5].data} className='self-touch'>
                <Avatar  icon={<GithubOutlined />} />
                </Tooltip>
            </div>
        </div>
        
)
    
}
export default Myself