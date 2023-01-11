import { Router } from "express";

import { hasToken } from "../middlewares/authValidationMiddleware.js";
import followersValidation from "../middlewares/followersMiddleware.js";
import { deleteFollower, postFollower } from "../controllers/followersController.js";

const router = Router();

router.post("/followers", hasToken, followersValidation, postFollower);
router.delete("/followers", hasToken, followersValidation, deleteFollower);

export default router;
