import { insertRepost } from "../repositories/repostRepository.js";

export async function postRepost(req, res, next) {
    const postId = req.params;
    const { userId } = res.locals.user;
  
    try {
      const insertRepost= await insertRepost(userId,postId);
  

    } catch (err) {
      res.status(500).send(err.message);
    }
    next();
  }