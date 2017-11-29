const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const Schema=mongoose.Schema;
let ObjectId = Schema.ObjectId;
const salt = 10;

let userSchema=new mongoose.Schema({
    username:{
        unique:true, //唯一
        type:String
    },
    psw:String,
    role:{
        //初始值为0     >50   管理员权限
      type:Number,
      default:0
    },
    comment:[{type:ObjectId,ref:'Comment'}],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

userSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt;
    }else {
        this.meta.updateAt=Date.now();
    }
    let user = this;
    bcrypt.genSalt(salt,function (err,salt) {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.psw,salt,function (err,hsah) {
            if(err){
                return next(err);
            }
            user.psw=hsah;
            next();
        })
    })
});

//静态方法  加密
//解密  ==>   登录 
userSchema.statics={
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

userSchema.methods={
    comparePsw:function (psw,cb) {
        bcrypt.compare(psw,this.psw,function (err,isMatch) {
            if(err){cb(err,null); return}
            cb(null,isMatch);
        })
    }
}

module.exports = userSchema;