import { Router } from "express";
import { getUsers, getPostsByUser } from "../controllers/searchController";
import { hasToken } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.get("users/:id", hasToken, getUsers);
router.get("posts/users/:id", hasToken, getPostsByUser);

export default router;