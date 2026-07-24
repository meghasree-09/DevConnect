import Project from "../models/Project.js";


// Get all team members of a project
export const getTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("createdBy", "userName email role")
      .populate("teamMembers.user", "userName email role");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      projectName: project.title,
      createdBy: project.createdBy,
      teamMembers: project.teamMembers,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update member role
export const updateMemberRole = async (req, res) => {
  try {

    const { projectId, memberId } = req.params;
    const { role } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const member = project.teamMembers.find(
      (m) => m.user.toString() === memberId
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    member.role = role;

    await project.save();

    res.status(200).json({
      message: "Role updated successfully",
      member,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Remove member
export const removeMember = async (req, res) => {
  try {

    const { projectId, memberId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.teamMembers = project.teamMembers.filter(
      (member) => member.user.toString() !== memberId
    );

    await project.save();

    res.status(200).json({
      message: "Member removed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};