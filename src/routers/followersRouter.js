import { Router } from "express";

import { hasToken } from "../middlewares/authValidationMiddleware.js";
import followersValidation from "../middlewares/followersMiddleware.js";
import {
  deleteFollowing,
  getFollowing,
  postFollowing,
} from "../controllers/followersController.js";

const router = Router();

router.get("/followers/:id", hasToken, getFollowing);
router.post("/followers", hasToken, followersValidation, postFollowing);
router.delete("/followers/:id", hasToken, deleteFollowing);

export default router;
