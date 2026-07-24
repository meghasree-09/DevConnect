import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["document", "github", "video", "website"],
      required: true,
    },

    file: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resource", resourceSchema);