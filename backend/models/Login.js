import mongoose  from "mongoose";

const User=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},


})

export const UserDetails=mongoose.model("usersdetails",User)