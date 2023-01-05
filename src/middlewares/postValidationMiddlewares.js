import { postSchema } from "../models/postSchema.js";

export async function validPost(req, res, next) {
  const { id } = req.params;
  const post = req.body;

  const validation = postSchema.validate(post, {
    abortEarly: false,
  });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const existPost = await connection.query(
      `SELECT * FROM posts WHERE id=$1`,
      [id]
    );

    if (existPost.rows.length === 0) {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  res.locals.post = post;

  next();
}
