import { Router } from "express";
import { getLikes, postLike, deleteLike } from "../controllers/likesController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";


const router = Router();

router.get("/likes/:id", hasToken, getLikes);
router.post("/like/:id", hasToken, postLike);
router.post("/dislike/:id", hasToken, deleteLike);

export default router;