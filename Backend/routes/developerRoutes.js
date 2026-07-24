import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {

getDevelopers,
getDeveloperById,
createDeveloper,deleteDeveloper

}
from
"../controllers/developerController.js";

const router =
express.Router();

router.get(
    "/",
    getDevelopers
);

router.get(
    "/:id",
    getDeveloperById
);

router.post(
    "/",protect,
    createDeveloper
);
router.delete("/:id", deleteDeveloper);
export default router;