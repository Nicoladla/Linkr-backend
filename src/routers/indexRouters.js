import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouters from "../routers/postsRouter.js";
import likesRouter from "../routers/likesRouter.js";
import searchRouter from "../routers/searchRouter.js"
import repostRouter from "./repostRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouters);
router.use(likesRouter);
router.use(searchRouter);
router.use(repostRouter);
export default router;
