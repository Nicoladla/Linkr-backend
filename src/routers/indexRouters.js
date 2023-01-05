import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouters from "../routers/postsRouter.js"
const router = Router();

router.use(authRouter)
router.use(postsRouters)


export default router;
