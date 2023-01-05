import joi from "joi";

export const userSchema = joi.object({
    username: joi.string().required().min(4).max(50),
    image: joi.string().uri().required().min(4),
    password: joi.string().required().min(4),
    confirmPassword: joi.ref("password"),
    email: joi.string().email().required().min(4)
  });

  export const signInSchema = joi.object({
    email: joi.string().email().required().min(4),
    password: joi.string().required(),
   
   
  });