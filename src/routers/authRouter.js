import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInValidation, signUpValidation } from "../middlewares/authValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", signUpValidation, signUp);
authRouter.post("/signin", signInValidation, signIn);

export default authRouter;