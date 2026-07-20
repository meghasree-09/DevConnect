import express from "express";

import {

getDevelopers,
getDeveloperById,
createDeveloper

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
    "/",
    createDeveloper
);

export default router;