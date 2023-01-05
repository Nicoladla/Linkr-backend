import connection from "../database/db.js";

export async function updatePost(req, res) {
  const { id } = req.params;
  const { link, description } = res.locals.post;

  try {
    const existPost = await connection.query(
      `SELECT * FROM posts WHERE id=$1`,
      [id]
    );

    if (existPost.rows.length === 0) {
      res.sendStatus(404);
    }

    await connection.query(
      `UPDATE posts SET link=$1, description=$2 WHERE id=$3`,
      [link, description, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const token = res.locals.token;

  try {
    const postResult = await connection.query(
      `SELECT * FROM posts WHERE id=$1`,
      [id]
    );
    const getUser = await connection.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );

    if (postResult.rowCount === 0) return res.sendStatus(404);

    const [post] = postResult.rows;

    if (post.userId !== getUser.rows[0].id) return res.sendStatus(401);

    await connection.query(`DELETE FROM posts WHERE id=$1`, [id]);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getHashtag(req, res) {
  const {hashtag} = req.params;

  
}