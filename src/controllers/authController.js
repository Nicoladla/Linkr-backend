import bcrypt from "bcrypt";
import { insertUser } from "../repositories/authRepository.js";
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
    const{username,image}=req.body;
    const userId = res.locals.userId;

   const userData = {username:username,image:image,userId:userId};
    const secretKey=process.env.JWT_SECRET;
    const config = { expiresIn: 60*60*24 }
   
    const token = jwt.sign(userData, secretKey,config);
    
    try {
       
         res.status(200).send(token)
       } catch (err) {
         console.log(err);
         res.sendStatus(500)
       }
}