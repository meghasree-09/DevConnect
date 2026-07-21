import mongoose from "mongoose";

const teamRequestSchema =
  new mongoose.Schema(
    {
      projectId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      message: {
        type: String,
        default:
          "I would like to join your team.",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
        ],
        default:
          "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const TeamRequest =
  mongoose.model(
    "TeamRequest",
    teamRequestSchema
  );

export default TeamRequest;