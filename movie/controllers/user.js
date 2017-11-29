const User=require('../model/user');
const Comment=require('../model/comment');
const Movie=require('../model/movie');
//展示登录界面
exports.showLogin=(req,res)=>{
    res.render('./page/login',{'title':'login'})
}

//展示注册界面
exports.showRegister=(req,res)=>{
    res.render('./page/register',{'title':'register'})
}

//注册功能
exports.doRegister=(req,res)=>{
    let {username,psw}=req.body;
    console.log(req.body)
    User.find({username},(err,userArr)=>{
        if(err){
            console.log(err);
            res.redirect('/user/register');
            return
        }
        console.log(userArr,'index in 23')
        if(userArr && userArr.length !== 0){
            res.redirect('/user/register');
        }else {
            let _user=new User({username,psw});
            _user.save((err,doc)=>{
                if(err){
                    console.log(err);
                    res.redirect('/user/register');
                    return
                }
                res.redirect('/user/login');
            })
        }
    })

}

//登录功能
exports.doLogin=(req,res)=>{
    let {username,psw}=req.body;
    User.findOne({username},(err,user)=>{
        if(err){
            console.log(err);
            res.redirect('/user/register');
            return
        }
        if(!user){
            res.redirect('/user/register');
            return
        }
        user.comparePsw(psw,(err,isMatch)=>{
            if(err){
                console.log(err);
                res.redirect('/user/register');
                return
            }
            if (isMatch){
                req.session.user=user;
                res.redirect('/');
            }else {
                res.redirect('/user/register');
            }
        })
    })
}

//退出功能
exports.doLogout=(req,res)=>{
    req.session.user=null;
    res.redirect('/');
}

//发表评论功能   or   回复功能
exports.doComment=(req,res)=>{
    let {movieId,content,cId,toId}=req.body;
    //回复功能
    if (cId) {
        let from = req.session.user;
        Comment.findById(cId,(err,commentObj)=>{
            if(err){
                console.log(err);
                return
            }
            commentObj.reply.push({from:from._id,to:toId,content})
            commentObj.save((err,docObj)=>{
                if(err){
                    console.log(err);
                    return
                }
                //todo  user集合comment字段的添加
                res.redirect('/movie/'+movieId);
            })
        })
    }else {
        let user = req.session.user;
        //发表评论  =>   来到comment增加了两项,     movie ,user  =>
        let _comment=new Comment({content,movie:movieId,from:user._id})
        _comment.save((err,doc)=>{
            if(err){
                console.log(err);
                return
            }
            Movie.update({_id:movieId},{$push:{comment:doc._id}},(err,r)=>{
                if(err){
                    console.log(err);
                    return
                }
                User.update({_id:user._id},{$push:{comment:doc._id}},(err,r)=>{
                    if(err){
                        console.log(err);
                        return
                    }
                    res.redirect('/movie/'+movieId);
                })
            })
        })
    }
}

exports.doSearch=(req,res)=>{
    // q 电影查询  p第几页
    // 用参数控制你到底是什么的查询
    let p=parseInt(req.query.p) || 0;
    let q=req.query.q;
    let index=p*5;
    Movie.find({movieName:new RegExp(q+'.*','i')},(err,docs)=>{
        let results = docs.slice(index,index+5);
        res.render('./page/result',{
            title:"电影搜索结果列表页",
            keyWord:q,
            movies:results,
            query:'q='+q,    //q='小'
            totalPage:Math.ceil(docs.length/5),
            curretnPage:p+1
        })
    })

}

//用户登录验证
exports.userRequiredLogin=(req,res,next)=>{
    if(req.session.user){
        next();
    }else {
        res.redirect('/');
    }
}


