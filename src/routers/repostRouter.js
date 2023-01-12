import { Router } from "express";
import { postRepost } from "../controllers/repostController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.post("/repost/:postId", hasToken,postRepost)


export default router;
