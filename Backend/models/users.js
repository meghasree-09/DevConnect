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
        enum:[
            "admin",
            "user",
            "projectLead"
        ]
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    location:{
        type:String,
        default:""
    },

    bio:{
        type:String,
        default:""
    },

    skills:{
        type:[String],
        default:[]
    },

    github:{
        type:String,
        default:""
    },

    linkedin:{
        type:String,
        default:""
    },

    portfolio:{
        type:String,
        default:""
    },

    profileImage:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});

const User = mongoose.model(
    "User",
    userSchema
);

export default User;