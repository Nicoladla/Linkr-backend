import { Router } from "express";
import { getLikes, postLike, deleteLike } from "../controllers/likesController.js";

const router = Router();

router.get("likes/:id", getLikes);
router.post("like/:id", postLike);
router.delete("like/:id", deleteLike);

router.get("users/:id",);
router.get("posts/users/:id");

export default router;