import TeamRequest
from "../models/TeamRequest.js";
import Notification from "../models/Notification.js";
import Project from "../models/Project.js";

export const createRequest = async (req, res) => {
  try {

    const existing = await TeamRequest.findOne({
      projectId: req.body.projectId,
      userId: req.body.userId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already requested to join this project.",
      });
    }

   const request = await TeamRequest.create(req.body);

      // Find the project
      const project = await Project.findById(req.body.projectId);

      // Create notification for Project Lead
      await Notification.create({
        receiver: project.createdBy,
        sender: req.body.userId,
        type: "JOIN_REQUEST",
        message: "A developer has requested to join your project.",
      });

      res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
export const getRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Lead ID:", userId);

    const projects = await Project.find({
      createdBy: userId,
    });

    console.log("Projects found:", projects);

    const projectIds = projects.map((project) => project._id);

    console.log("Project IDs:", projectIds);

    const requests = await TeamRequest.find({
      projectId: { $in: projectIds },
    })
      .populate("userId")
      .populate("projectId");

    console.log("Requests found:", requests);

    res.status(200).json(requests);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateRequest = async (req, res) => {
  try {
    const request = await TeamRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

          await Notification.create({
        receiver: request.userId,
        sender: request.projectId.createdBy,
        type:
          req.body.status === "accepted"
            ? "REQUEST_ACCEPTED"
            : "REQUEST_REJECTED",
        message:
          req.body.status === "accepted"
            ? "Your request has been accepted."
            : "Your request has been rejected.",
      });

    // If accepted, add user as a team member
    if (req.body.status === "accepted") {
      await Project.findByIdAndUpdate(
        request.projectId,
        {
          $addToSet: {
            teamMembers: {
              user: request.userId,
              role: "Member",
              joinedAt: new Date(),
            },
          },
        },
        { new: true }
      );
    }

    const updatedRequest = await TeamRequest.findById(request._id)
      .populate("userId")
      .populate("projectId");

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};