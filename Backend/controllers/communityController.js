import Community
from "../models/Community.js";

/* ===========================
   Get All Communities
=========================== */

export const getCommunities =
  async (req, res) => {

    try {

      const communities =
        await Community.find();

      res.status(200)
        .json(
          communities
        );

    }
    catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};

/* ===========================
   Create Community
=========================== */

export const createCommunity =
  async (req, res) => {

    try {

      console.log(
        "Request Body : ",
        req.body
      );

      const {
        name,
        description,
      } = req.body;

      if (
        !name ||
        !description
      ) {
        return res
          .status(400)
          .json({
            message:
              "Name and Description are required",
          });
      }

      const community =
        await Community.create({
          name,
          description,
          members: [],
        });

      res.status(201)
        .json(
          community
        );

    }
    catch (error) {

      console.log(
        "Community Error : ",
        error
      );

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};

/* ===========================
   Join Community
=========================== */

export const joinCommunity =
  async (req, res) => {

    try {

      const {
        communityId,
        userId,
      } = req.body;

      const community =
        await Community.findById(
          communityId
        );

      if (
        !community
      ) {
        return res
          .status(404)
          .json({
            message:
              "Community Not Found",
          });
      }

      const alreadyJoined =
        community.members.some(
          (member) =>
            member.toString() ===
            userId
        );

      if (
        alreadyJoined
      ) {
        return res
          .status(400)
          .json({
            message:
              "Already Joined",
          });
      }

      community.members.push(
        userId
      );

      await community.save();

      res.status(200)
        .json({
          message:
            "Joined Successfully",
          community,
        });

    }
    catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};