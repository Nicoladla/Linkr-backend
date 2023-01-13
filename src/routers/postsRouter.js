import { Router } from "express";

import { postHashtag } from "../controllers/hashtagController.js";
import { updatePost, deletePost, postPost, getPosts } from "../controllers/postsController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";
import { validPost } from "../middlewares/postValidationMiddlewares.js";

const router = Router();

router.get("/posts", hasToken, getPosts)
router.post("/posts", hasToken, validPost, postPost, postHashtag);
router.patch("/posts/:id", hasToken, validPost, updatePost);
router.delete("/posts/:id", hasToken, deletePost);


export default router;
