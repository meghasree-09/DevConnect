import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(

  {

    user:{

      type:mongoose.Schema.Types.ObjectId,

      ref:"User",

      required:true,

      unique:true

    },

    emailNotifications:{

      type:Boolean,

      default:true

    },

    pushNotifications:{

      type:Boolean,

      default:true

    },

    teamRequestNotifications:{

      type:Boolean,

      default:true

    },

    publicProfile:{

      type:Boolean,

      default:true

    },

    showEmail:{

      type:Boolean,

      default:false

    },

    showPhone:{

      type:Boolean,

      default:false

    },

    theme:{

      type:String,

      default:"dark"

    },

    language:{

      type:String,

      default:"English"

    }

  },

  {

    timestamps:true

  }

);

export default mongoose.model(
  "Settings",
  settingsSchema
);