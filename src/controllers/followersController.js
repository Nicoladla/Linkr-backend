import { selectUser } from "../repositories/authRepository.js";
import {
  fetchFollowing,
  insertFollowing,
  deletefollowing,
} from "../repositories/followersRepositoy.js";

export async function getFollowing(req, res) {
  const { userId } = res.locals.user;
  const followingUserId = Number(req.params.id);

  try {
    if (typeof followingUserId !== "number") {
      return res.status(400).send({ message: "Invalid user" });
    }

    const usersExist = await selectUser(followingUserId);
    if (usersExist.rowCount === 0) {
      return res.status(400).send({ message: "Invalid user" });
    }

    const following = await fetchFollowing(userId, followingUserId);

    res.status(200).send(following.rows[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function postFollowing(req, res) {
  const { followingUserId } = req.body;
  const { userId } = res.locals.user;

  try {
    const usersExist = await selectUser(followingUserId);
    if (usersExist.rowCount === 0) {
      return res.status(400).send({ message: "Invalid user" });
    }

    const followingExist = await fetchFollowing(userId, followingUserId);
    if (followingExist.rowCount !== 0) {
      return res.status(409).send({ message: "You already follow this user" });
    }

    await insertFollowing(userId, followingUserId);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function deleteFollowing(req, res) {
  const followingUserId = Number(req.params.id);
  const { userId } = res.locals.user;

  try {
    if (typeof followingUserId !== "number") {
      return res.status(400).send({ message: "Invalid user" });
    }

    const followingExist = await fetchFollowing(userId, followingUserId);
    if (followingExist.rowCount === 0) {
      return res.status(404).send({ message: "You do not follow this user" });
    }

    await deletefollowing(followingExist.rows[0].id);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
