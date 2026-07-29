import TeamRequest from "../models/TeamRequest.js";
import Notification from "../models/Notification.js";
import Project from "../models/Project.js";

// =========================
// Create Join Request
// =========================
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

    // Find project
    const project = await Project.findById(req.body.projectId);

    // Notify project lead
    if (project) {
      await Notification.create({
        receiver: project.createdBy,
        sender: req.body.userId,
        type: "JOIN_REQUEST",
        message: "A developer has requested to join your project.",
      });
    }

    res.status(201).json(request);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Get Requests for Lead
// =========================
export const getRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all projects created by this lead
    const projects = await Project.find({
      createdBy: userId,
    });

    const projectIds = projects.map((project) => project._id);

    // Find requests for those projects
    const requests = await TeamRequest.find({
      projectId: { $in: projectIds },
    })
      .populate("userId")
      .populate("projectId");

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Accept / Reject Request
// =========================
export const updateRequest = async (req, res) => {
  try {
    const request = await TeamRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Update request status
    request.status = req.body.status;
    await request.save();

    // Find project
    const project = await Project.findById(request.projectId);

    // Notify developer
    if (project) {
      await Notification.create({
        receiver: request.userId,
        sender: project.createdBy,
        type:
          req.body.status === "accepted"
            ? "REQUEST_ACCEPTED"
            : "REQUEST_REJECTED",
        message:
          req.body.status === "accepted"
            ? "Your request has been accepted."
            : "Your request has been rejected.",
      });
    }

    // Add developer to project if accepted
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
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};