'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() { 
    this.ctx.body ='<h1>hello</h1>'
  }
  async getArticlelist(){
    let sql = 'select article.id as id,'+
              ' article.title as title,'+
              "from_unixtime(article.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
              ' article.introduce as introduce,'+
              ' type.type_name as typeName'+
              ' from article left join type on article.type_id=type.Id'
    let data=await this.app.mysql.query(sql)
    this.ctx.body ={data:data}
  }
  async getArticleById(){
    let id = this.ctx.query.id
    let sql = 'select article.id as id,'+
              ' article.title as title,'+
              "from_unixtime(article.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
              ' article.introduce as introduce,'+
              ' article.content as content,'+
              ' type.type_name as typeName'+
              ' from article left join type on article.type_id=type.Id '+
              'where article.Id='+id
    let data=await this.app.mysql.query(sql)
    this.ctx.body ={data:data}
  }
  async getArticleHead(){
    let sql = 'select * from head'
    let data=await this.app.mysql.query(sql)
    this.ctx.body ={data:data}
  }
  async getArticleIndex(){
    let id = this.ctx.query.id
    let sql = 'select article.id as id,'+
              ' article.title as title,'+
              "from_unixtime(article.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
              ' article.introduce as introduce,'+
              ' article.content as content,'+
              ' type.type_name as typeName'+
              ' from article left join type on article.type_id=type.Id '+
              'order by id desc LIMIT 5'
    let data=await this.app.mysql.query(sql)
    this.ctx.body ={data:data}
  }
  async getArticleContact(){
    let sql = 'select * from contact'
    let data=await this.app.mysql.query(sql)
    this.ctx.body ={data:data}
  }
}

module.exports = HomeController;
