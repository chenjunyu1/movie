//model
const movie = require('../model/movie');

//展示首页
exports.showindex= (req,res)=>{
        movie.fetch((err,docArr)=>{
            if(err){console.log(err);return}
            res.render('index',{'title':'电影',movies:docArr})
        })
    }
