import { Router } from "express";
import { getUsers, getPostsByUser } from "../controllers/searchController";

const router = Router();

router.get("users/:id", getUsers);
router.get("posts/users/:id", getPostsByUser);

export default router;