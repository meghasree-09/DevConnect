import Chat from "../models/Chat.js";

// ==========================
// Send Message
// ==========================
export const sendMessage = async (req, res) => {
  try {
    const { community, sender, message } = req.body;

    const chat = await Chat.create({
      community,
      sender,
      message,
    });

    const populatedChat = await Chat.findById(chat._id)
      .populate("sender", "userName email role");

    res.status(201).json(populatedChat);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Community Messages
// ==========================
export const getMessages = async (req, res) => {
  try {

    const { communityId } = req.params;

    const chats = await Chat.find({
      community: communityId,
    })
      .populate("sender", "userName email role")
      .sort({ createdAt: 1 });

    res.status(200).json(chats);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Message (Optional)
// ==========================
export const deleteMessage = async (req, res) => {
  try {

    const { id } = req.params;

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await Chat.findByIdAndDelete(id);

    res.status(200).json({
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};