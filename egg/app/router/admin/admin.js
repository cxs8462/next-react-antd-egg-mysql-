module.exports=app=>{
    const { router, controller } = app;
    let adminauth = app.middleware.adminauth()
    router.post('/login',controller.admin.admin.checkLogin)
    //分类增删改查
    router.post('/login/getType',adminauth,controller.admin.admin.getType)
    router.post('/login/addType',adminauth,controller.admin.admin.addType)
    router.post('/login/delType',adminauth,controller.admin.admin.delType)
    router.post('/login/updataType',adminauth,controller.admin.admin.updataType)
    //个人信息
    router.post('/login/getPer',adminauth,controller.admin.admin.getPer)
    router.post('/login/updataPer',adminauth,controller.admin.admin.updataPer)
    //网站头部
    router.post('/login/getHead',adminauth,controller.admin.admin.getHead)
    router.post('/login/updataHead',adminauth,controller.admin.admin.updataHead)
    //文章
    router.post('/login/getArticle',adminauth,controller.admin.admin.getArticle)
    router.post('/login/delArticle',adminauth,controller.admin.admin.delArticle)
    router.post('/login/getArticleId',adminauth,controller.admin.admin.getArticleId)
    router.post('/login/addArticle',adminauth,controller.admin.admin.addArticle)
    router.post('/login/updataArticle',adminauth,controller.admin.admin.updataArticle)






}