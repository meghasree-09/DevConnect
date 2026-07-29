import Community from "../models/Community.js";

/* ===========================
   Get All Communities
=========================== */

export const getCommunities = async (req, res) => {
  try {

    const communities = await Community.find()
      .populate("createdBy", "studentName")
      .populate("members", "studentName email role");

    res.status(200).json(communities);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* ===========================
   Get Community By Id
=========================== */

export const getCommunityById = async (req, res) => {

  try {

    const community = await Community.findById(req.params.id)
      .populate("createdBy", "studentName email role")
      .populate("members", "studentName email role");

    if (!community) {

      return res.status(404).json({
        message: "Community Not Found",
      });

    }

    res.status(200).json(community);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ===========================
   Create Community
=========================== */

export const createCommunity = async (req, res) => {

  try {

    const {
      name,
      description,
      category,
      image,
      technologies,
      rules,
      createdBy,
    } = req.body;

    if (!name || !description || !category) {

      return res.status(400).json({
        message: "Please fill all required fields.",
      });

    }

    const community = await Community.create({

      name,
      description,
      category,

      image: image || "",

      technologies: technologies || [],

      rules: rules || [],

      createdBy,

      members: [],

    });

    res.status(201).json(community);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ===========================
   Join Community
=========================== */
export const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.body;
    const userId = req.user._id;

    if (!communityId) {
      return res.status(400).json({
        message: "Community ID is required.",
      });
    }

    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({
        message: "Community Not Found",
      });
    }

    const alreadyJoined = community.members.some(
      (member) => member.toString() === userId.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({
        message: "Already Joined",
      });
    }

    community.members.push(userId);
    await community.save();

    res.status(200).json({
      message: "Joined Successfully",
      community,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateCommunity = async (req, res) => {
  try {

    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCommunity) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    res.status(200).json(updatedCommunity);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};