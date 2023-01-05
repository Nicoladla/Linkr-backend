import { Router } from "express";
import { getLikes, postLike, deleteLike } from "../controllers/likesController.js";

const router = Router();

router.get("likes/:id", getLikes);
router.post("like/:id", postLike);
router.delete("like/:id", deleteLike);

export default router;