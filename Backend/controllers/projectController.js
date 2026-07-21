import Project from "../models/Project.js";


// GET ALL PROJECTS
export const getProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find();

      res.status(200)
        .json(projects);

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


// GET SINGLE PROJECT
export const getProjectById =
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res
          .status(404)
          .json({
            message:
              "Project Not Found",
          });

      }

      res.status(200)
        .json(project);

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


// CREATE PROJECT
export const createProject =
  async (req, res) => {

    try {

      const project =
        await Project.create(
          req.body
        );

      res.status(201)
        .json(project);

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


// UPDATE PROJECT
export const updateProject =
  async (req, res) => {

    try {

      const project =
        await Project.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.status(200)
        .json(project);

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


// DELETE PROJECT
export const deleteProject =
  async (req, res) => {

    try {

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.status(200)
        .json({
          message:
            "Project Deleted Successfully",
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