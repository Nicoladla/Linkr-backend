import { Router } from "express";
import { postRepost } from "../controllers/repostController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";

const repostRouter = Router();

repostRouter.post("/repost/:postId", hasToken,postRepost)


export default repostRouter;
