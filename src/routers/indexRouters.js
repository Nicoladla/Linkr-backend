import { Router } from "express";

import authRouter from "./authRouter.js";
import followersRouter from "./followersRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use(authRouter);
router.use(followersRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(searchRouter);

export default router;
