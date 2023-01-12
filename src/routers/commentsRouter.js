import { Router } from "express";
import { hasToken } from "../middlewares/authValidationMiddleware.js";
import { isCommentOk } from "../middlewares/commentValidationMiddleware.js";
import { getComments, postComment } from "../controllers/commentsController.js";


const router = Router();

router.get("/posts/:id/comments", hasToken, getComments);
router.post("/posts/:id/comment", hasToken, isCommentOk, postComment);

export default router;