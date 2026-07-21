import TeamRequest
from "../models/TeamRequest.js";

export const createRequest =
  async (req, res) => {

    try {

      const request =
        await TeamRequest.create(
          req.body
        );

      res.status(201)
        .json(request);

    }
    catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }

};

export const getRequests =
  async (req, res) => {

    try {

      const requests =
        await TeamRequest.find()
          .populate(
            "userId"
          )
          .populate(
            "projectId"
          );

      res.status(200)
        .json(requests);

    }
    catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }

};