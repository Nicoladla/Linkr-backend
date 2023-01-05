import bcrypt from "bcrypt";
import { insertUser,selectUser } from "../repositories/authRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
export async function signUp (req,res){
    const {username,email ,password,image } = req.body;
    const passwordHash = bcrypt.hashSync(password,10);
    try{
        await insertUser(username,email,passwordHash,image);
        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
}

export async function signIn (req,res){
   
    const userId = res.locals.userId;
    const userRows = await selectUser(userId);

    const user = userRows.rows[0];
   const userData = {username:user.username,image:user.image,userId:userId};
    const secretKey=process.env.JWT_SECRET;
    const config = { expiresIn: 60*60*24 }
  
    const token = jwt.sign(userData, secretKey,config);
   
    try {
       
         res.status(200).send({token:token,userId:userId,username:user.username,image:user.image})
       } catch (err) {
         console.log(err);
         res.sendStatus(500)
       }
}