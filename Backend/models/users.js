import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user","projectLead"],
        
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    
    
},{
    timestamps:true
});
//model:represents a mongodb collection
//and used to perform CRUD operations

const User=mongoose.model(
    "User",
    userSchema
);
export default User;