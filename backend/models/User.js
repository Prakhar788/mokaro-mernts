import mongoose  from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    number:{type:String,required:true,unique:true},
    itemprice:{type:Number,required:true},
    tax:{type:Number,required:true,unique:true},
    totalPrice:{type:Number,required:true,unique:true},
    id:{type:Number,unique:true}

})

export const UserModel=mongoose.model("users",UserSchema)