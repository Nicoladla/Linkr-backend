import { Router } from "express";
import { getHashtagByName, getTrendig } from "../controllers/hashtagController.js";
import { hasToken } from "../middlewares/authValidationMiddleware.js";


const router = Router();

router.get("/trending", hasToken, getTrendig);
router.get("/hashtag/:hashtag", hasToken, getHashtagByName);

export default router;