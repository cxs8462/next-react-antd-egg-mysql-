import React,{useState} from 'react';
import 'antd/dist/antd.css'
import { Card, Spin ,Button, Input,message} from 'antd'
import '../static/Pages/Login.css'
import axios from 'axios'
function Login(props){
    const [userName,setUserName]=useState('')
    const [passWord,setpassWord]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    return(
        <div className='login-box'>
            <Spin tip='登录中....' spinning={isLoading}>
                <Card className='login-card' title="登录" bordered={false}>
                    <Input value={userName}  onChange={(e)=>{setUserName(e.target.value)}} className='login-input' placeholder='input username'></Input>
                    <Input.Password value={passWord} onChange={(e)=>{setpassWord(e.target.value)}} className='login-input' placeholder='input password'></Input.Password>
                    <Button type='primary' onClick={ToLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
    async function ToLogin(){
        setIsLoading(true)
        if(!userName&&!passWord) {
            message.error('不能有空')
            setIsLoading(false)
            return ''
        }
        let res=await axios.post('http://175.24.111.110:7001/login',{username:userName,password:passWord})
        if(res.data.token){
            localStorage.setItem('token',res.data.token)
            message.success('登录成功')
            props.history.push('/admin')
        }else{
            setIsLoading(false)
            message.error('账号密码错误')
            return ''
        }
    }
}
export default Login