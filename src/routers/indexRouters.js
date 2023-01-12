import { Router } from "express";

import authRouter from "./authRouter.js";

import postsRouters from "../routers/postsRouter.js";
import likesRouter from "../routers/likesRouter.js";
import searchRouter from "../routers/searchRouter.js"
import commentRouter from "../routers/commentsRouter.js";
import followersRouter from "./followersRouter.js";
import repostRouter from "./repostRouter.js";

const router = Router();

router.use(authRouter);
router.use(followersRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(searchRouter);
router.use(commentRouter);
router.use(repostRouter);
export default router;
