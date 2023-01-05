import { Router } from "express";
import { updatePost, deletePost } from "../controllers/postsController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";
import { validPost } from "../middlewares/postValidationMiddlewares.js";

const router = Router();

router.post("/posts/:id", hasToken, validPost, updatePost);
router.delete("/posts/:id", hasToken, deletePost)
router.post("hashtag/:hastag")

export default router;
