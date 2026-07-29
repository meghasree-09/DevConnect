import Notification from "../models/Notification.js";

// Create Notification
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Notifications of Logged-in User
export const getUserNotifications = async (req, res) => {
  try {
    console.log("==================================");
    console.log("Notification API Called");
    console.log("User ID:", req.params.userId);

    const notifications = await Notification.find({
      receiver: req.params.userId,
    })
      .populate("sender", "userName email")
      .populate("receiver", "userName email")
      .sort({ createdAt: -1 });

    console.log("Notifications:", notifications);

    res.status(200).json(notifications);

  } catch (error) {
    console.error("Notification Error:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// Mark Notification as Read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};