import { postSchema } from "../models/postSchema.js";

export async function validPost(req, res, next) {
  const post = req.body;

  const validation = postSchema.validate(post, {
    abortEarly: false,
  });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.post = post;

  next();
}