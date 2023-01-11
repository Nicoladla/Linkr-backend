import { followersSchema } from "../models/followersSchema.js";

export default function followersValidation(req, res, next) {
  const follow = req.body;

  try {
    const { error } = followersSchema.validate(follow, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(422).send({ message: errors });
    }

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
