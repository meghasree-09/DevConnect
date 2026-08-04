import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {

    getSettings,
    updateSettings

} from "../controllers/settingsController.js";

const router = express.Router();

router.get(
    "/:userId",
    protect,
    getSettings
);

router.put(
    "/:userId",
    protect,
    updateSettings
);

export default router;