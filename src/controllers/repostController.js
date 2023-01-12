import { insertRepost } from "../repositories/repostRepository.js";


export async function postRepost(req, res) {

    const {postId} = req.params;
    const { userId } = res.locals.user;

    try {
      await insertRepost(userId,postId);
  res.sendStatus(200)

    } catch (err) {
      res.status(500).send(err.message);
    }

  }