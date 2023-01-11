import { Router } from "express";

import { hasToken } from "../middlewares/authValidationMiddleware.js";
import { deleteFollower, postFollower } from "../controllers/followersController.js";

const router = Router();

router.post("/followers", hasToken, postFollower);
router.delete("/followers", hasToken, deleteFollower);

export default router;
