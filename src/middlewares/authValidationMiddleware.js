import bcrypt from "bcrypt";
import { signInSchema, userSchema } from "../models/userSchema.js";

import { checkEmail, checkUsername } from "../repositories/authRepository.js";

export async function hasToken(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;
  if (!token) {
    return res.sendStatus(401);
  }

  
  try {
   const userData= jwt.verify(token, secretKey);
   res.locals.token = token;
   res.locals.user = userData;
  } catch {
   res.status(401).send("invalid token")
  }
  
  
  next();
}

export async function signUpValidation(req,res,next){
  const {username,email} = req.body;
  const isEmailRegistered=await checkEmail(email);
  const isUsernameRegistered = await checkUsername(username);
  if (isEmailRegistered.rows.length>0){
    return res.status(409).send("Email has already been registered!")
  }
  if(isUsernameRegistered.rows.length>0){
    return res.status(409).send("Username has already been registered!")
  }
  const {error} = userSchema.validate(req.body, {abortEarly:false});
   
    if(error){
      const erros = error.details.map((detail)=>detail.message);
      return res.status(422).send(erros);  
    }
  next();
}

export async function signInValidation (req,res,next){
  const{email,password} = req.body;
  const {error} = signInSchema.validate({email,password}, {abortEarly:false});
     
  if(error){
    const erros = error.details.map((detail)=>detail.message);
    return res.status(422).send(erros);  
  }
  const user =   await checkEmail(email);
if (user.rows.length===0){
  return res.status(401).send("Incorrect email!")
}
  const passwordConfirm = bcrypt.compareSync(password, user.rows[0].password);
  if( !passwordConfirm){
    return res.status(401).send("Incorrect password!")
  }
 
  res.locals.userId = user.rows[0].id;

  next();
}