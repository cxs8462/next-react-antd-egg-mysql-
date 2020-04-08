module.exports=app=>{
    const { router, controller } = app;
    router.get('/',controller.index.home.index)
    router.get('/getArticlelist',controller.index.home.getArticlelist)
    router.get('/getArticleById',controller.index.home.getArticleById)
    router.get('/getArticleHead',controller.index.home.getArticleHead)
    router.get('/getArticleIndex',controller.index.home.getArticleIndex)
    router.get('/getArticleContact',controller.index.home.getArticleContact)
}