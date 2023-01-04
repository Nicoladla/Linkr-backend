import { Router } from "express";
import { updatePost, deletePost } from "../controllers/postsController.js";
import { validPost } from "../middlewares/postValidationMiddlewares.js";
import { hasToken } from "../middlewares/tokenValidationMiddleware.js";


const router = Router();

router.post("/posts/:id", hasToken, validPost, updatePost);
router.delete("/posts/:id", hasToken, deletePost)

export default router;
