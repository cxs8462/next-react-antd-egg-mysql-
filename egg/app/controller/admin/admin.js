'use strict'

const Controller = require('egg').Controller

class adminController extends Controller{
    //分类增删改查
    async getType(){
        const data=await this.app.mysql.select('type')
        this.ctx.body=data
    }
    async addType(){
        let data=this.ctx.request.body.type
        const res=await this.app.mysql.insert('type',{type_name:data})
        this.ctx.body={isres:true}
    }
    async delType(){
        let data=this.ctx.request.body.id
        const res=await this.app.mysql.delete('type',{id:data})
        this.ctx.body={isres:true}
    }
    async updataType(){
        let data=this.ctx.request.body.type
        const res=await this.app.mysql.update('type',data)
        this.ctx.body={isres:true}
    }

    //获取与修改个人信息
    async getPer(){
        const data=await this.app.mysql.select('contact')
        this.ctx.body=data
    }
    async updataPer(){
        let data=this.ctx.request.body.data
        const res=await this.app.mysql.update('contact',data)
        this.ctx.body={isres:true}
    }

    //网站头部
    async getHead(){
        const data=await this.app.mysql.select('head')
        this.ctx.body=data
    }
    async updataHead(){
        let data=this.ctx.request.body.data
        const res=await this.app.mysql.update('head',data)
        this.ctx.body={isres:true}
    }
    //文章
    async getArticle(){
        let sql = 'select article.id as id,'+
                  ' article.title as title,'+
                  "from_unixtime(article.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
                  ' type.type_name as typeName'+
                  ' from article left join type on article.type_id=type.Id '
        let data=await this.app.mysql.query(sql)
        this.ctx.body =data
      }
      async delArticle(){
        let data=this.ctx.request.body.id
        const res=await this.app.mysql.delete('article',{id:data})
        this.ctx.body={isres:true}
    }
    async getArticleId(){
        let id = this.ctx.request.body.id
        let sql = 'select article.id as id,'+
                  ' article.title as title,'+
                  "from_unixtime(article.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
                  ' article.introduce as introduce,'+
                  ' article.content as content,'+
                  ' type.id as typeid'+
                  ' from article left join type on article.type_id=type.Id '+
                  'where article.Id='+id
        let data=await this.app.mysql.query(sql)
        this.ctx.body =data
      }
      async addArticle(){
        let data=this.ctx.request.body.data
        const res=await this.app.mysql.insert('article',data)
        this.ctx.body={isres:true}
    }
    async updataArticle(){
        let data=this.ctx.request.body.data
        const res=await this.app.mysql.update('article',data)
        this.ctx.body={isres:true}
    }


    //登录
    async checkLogin(){
        let userName = this.ctx.request.body.username
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE username = '"+userName +
                    "' AND password = '"+password+"'"
  
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            let openId=new Date().getTime()//登录成功,进行session缓存
            this.ctx.body={data:'登录成功',token:openId}
  
        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }

}
 
module.exports=adminController