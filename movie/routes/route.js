module.exports=function (app) {
    const index = require('../controllers/inedx');  //首页类路由方法
    const movie = require('../controllers/movie');  //电影类路由方法
    const admin = require('../controllers/admin');  //电影类路由方法
    const user = require('../controllers/user');  //用户类路由方法

    //会话状态预处理
    app.use((req,res,next)=>{
        if (req.session.user){
            res.locals.user=req.session.user;
            next();
        }else {
            next();
        }
    })

//首页
app.get('/',index.showindex);

//电影
app.get('/movie/:id',movie.movieDetail);

//管理员
app.get('/admin/movie/new',admin.adminRequired,admin.showAdminInsert)
app.get('/admin/update/:id',admin.adminRequired,admin.showAdminUpdate)
app.post('/admin/movie/new',admin.adminRequired,admin.adminInsertOrUpdate);
app.get('/admin/movie/list',admin.adminRequired,admin.adminshowList)
app.delete('/admin/movie/list',admin.adminRequired,admin.adminRemoveMovie)
app.post('/admin/backer', admin.showAdminHacker)

//用户
app.get('/user/login',user.showLogin);
app.get('/user/register',user.showRegister);
app.post('/user/login',user.doLogin);
app.post('/user/register',user.doRegister);
app.get('/user/logout',user.doLogout);
app.post('/user/comment',user.doComment);
app.get('/user/search',user.doSearch)    //搜索的接口尽量写一个

}