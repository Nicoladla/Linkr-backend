import { Router } from "express";
import { getLikes, postLike, deleteLike } from "../controllers/likesController.js";
import { validPost } from "../middlewares/postValidationMiddlewares.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.get("likes/:id", getLikes);
router.post("like/:id", hasToken, validPost, postLike);
router.delete("like/:id", hasToken, validPost, deleteLike);

export default router;