const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let ObjectId = Schema.ObjectId;

//关联关系:     是我们的comment  =>   movie user  (一对一)
//                      movie ,user  ==>   comment  (多对一)

let commentSchema=new mongoose.Schema({
    movie:{type:ObjectId,ref:'Movie'},
    from:{type:ObjectId,ref:'User'},
    reply:[{
        from:{type:ObjectId,ref:'User'},
        to:{type:ObjectId,ref:'User'},
        content:String,
    }],
    content:String,
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

commentSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt;
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
});


commentSchema.statics={
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

module.exports = commentSchema;