import { Router } from "express";
import { getUsers, getPostsByUser } from "../controllers/searchController";
import { hasToken } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.get("search", hasToken, getUsers);
router.get("users/:id", hasToken, getPostsByUser);

export default router;