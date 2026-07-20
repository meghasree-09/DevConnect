import mongoose from "mongoose";

const developerSchema =
new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    role:String,

    bio:String,

    location:String,

    skills:[String],

    image:String,

    github:String,

    linkedin:String,

    portfolio:String

});

export default mongoose.model(
    "Developer",
    developerSchema
);