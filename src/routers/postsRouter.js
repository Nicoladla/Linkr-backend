import { Router } from "express";

import { updatePost, deletePost, postPost } from "../controllers/postsController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";
import { validPost } from "../middlewares/postValidationMiddlewares.js";

const router = Router();
//perguntar a manu se ela ainda vai usar o middleware validPost

router.post("/posts", hasToken, validPost, postPost)
router.patch("/posts/:id", hasToken, validPost, updatePost);
router.delete("/posts/:id", hasToken, deletePost)
router.post("hashtag/:hastag")

export default router;
