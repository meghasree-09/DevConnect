import Event from "../models/Event.js";

/* Create Event */

export const createEvent = async (req, res) => {
  try {

    const event = await Event.create(req.body);

    res.status(201).json(event);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* Get Events */

export const getEvents = async (req, res) => {

  try {

    const events = await Event.find({
      community: req.params.communityId,
    })
      .populate("createdBy", "userName")
      .sort({ date: 1 });

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

/* Register */

export const registerEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        message: "Event Not Found",
      });

    }

    const alreadyRegistered =
      event.registeredUsers.some(
        (id) => id.toString() === req.body.userId
      );

    if (alreadyRegistered) {

      return res.status(400).json({
        message: "Already Registered",
      });

    }

    if (
      event.registeredUsers.length >= event.seats
    ) {

      return res.status(400).json({
        message: "No Seats Available",
      });

    }

    event.registeredUsers.push(req.body.userId);

    await event.save();

    res.status(200).json({
      message: "Registered Successfully",
      event,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};
/* Delete */

export const deleteEvent = async (req, res) => {

  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};