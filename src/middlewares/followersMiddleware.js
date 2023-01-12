import { followersSchema } from "../models/followersSchema.js";

export default function followersValidation(req, res, next) {
  const follow = req.body;
  const { userId } = res.locals.user;

  try {
    const { error } = followersSchema.validate(follow, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ message: errors });
    }

    if (follow.followingUserId === userId) {
      return res.status(400).send({ message: "Invalid user" });
    }

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
