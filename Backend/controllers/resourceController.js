import Resource from "../models/Resource.js";

/* Upload Resource */

export const uploadResource = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const resource = await Resource.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      link: req.body.link || "",
      file: req.file ? req.file.filename : "",
      community: req.body.community,
      uploadedBy: req.body.uploadedBy,
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* Get Resources */

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      community: req.params.communityId,
    }).populate("uploadedBy", "userName");

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Delete Resource */

export const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      message: "Resource Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};