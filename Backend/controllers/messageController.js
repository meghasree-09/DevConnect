import Message from "../models/Message.js";

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "userName")
      .populate("projectId", "title");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Project Messages
export const getProjectMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId,
    })
      .populate("sender", "userName")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};