import BugReport from "../models/BugReport.js";

// Create Bug Report
export const createBugReport = async (req, res) => {
  try {

    const report = await BugReport.create(req.body);

    res.status(201).json(report);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Bug Reports
export const getBugReports = async (req, res) => {
  try {

    const reports = await BugReport.find()
      .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Status
export const updateBugStatus = async (req, res) => {
  try {

    const report = await BugReport.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json(report);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};