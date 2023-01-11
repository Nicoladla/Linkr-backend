import { selectUser } from "../repositories/authRepository.js";
import {
  fetchFollowing,
  insertFollowing,
} from "../repositories/followersRepositoy.js";

export async function postFollower(req, res) {
  const { followingUserId } = req.body;
  const { userId } = res.locals.user;

  try {
    const usersExist = await selectUser(followingUserId);
    if (usersExist.rowCount === 0) {
      return res.status(400).send({ message: "Invalid user" });
    }

    if (followingUserId === userId) {
      return res.status(400).send({ message: "Invalid user" });
    }

    const followingExist = await fetchFollowing(userId, followingUserId);
    if (followingExist.rowCount !== 0) {
      return res.status(409).send({ message: "You already follow this user" });
    }

    await insertFollowing(userId, followingUserId);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteFollower(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
