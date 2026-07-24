import User from "../models/users.js";
import jwt from "jsonwebtoken";
// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id userName email phone role"
    );

    res.status(200).json(users);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getUserById =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User Not Found"
          });

      }

      res.status(200)
        .json(user);

    }
    catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

};

// ADD USER
export const addUser =
  async (req, res) => {

    try {

      const user =
        await User.create(
          req.body
        );

      res.status(201)
        .json(user);

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

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser =
  async (req, res) => {

    try {

      const user =
        await User.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }

        );

      res.status(200)
        .json(user);

    }
    catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

};

export const deleteUser =
  async (req, res) => {

    try {

      const user =
        await User.findByIdAndDelete(
          req.params.id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User Not Found"
          });

      }

      res.status(200)
        .json({
          message:
            "User Deleted Successfully"
        });

    }
    catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

};

// FORGOT PASSWORD
export const forgotPassword =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "Email not found",
          });

      }

      user.password =
        password;

      await user.save();

      res.status(200)
        .json({
          message:
            "Password Updated Successfully",
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