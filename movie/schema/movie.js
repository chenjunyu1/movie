const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let ObjectId = Schema.ObjectId;

let movieSchema=new mongoose.Schema({
    movieName:String,
    doctor:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
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

movieSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt;
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
});


movieSchema.statics={
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

module.exports = movieSchema;