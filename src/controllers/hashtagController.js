import {
  getHashtag,
  insertHashtag,
  insertPostHashtag,
} from "../repositories/hashtagRepository.js";

export async function postHashtag(req, res) {
  const { description } = req.body;
  const { postId } = res.locals;

  const regex = /(#[a-z0-9][a-z0-9\-_]*)/gi;
  const hashtags = description?.match(regex);

  try {
    if (!hashtags) return res.sendStatus(201);

    hashtags.forEach(async (hashtag) => {
      const hashtagExist = await getHashtag(hashtag);

      if (hashtagExist.rowCount === 0) {
        const insertingHashtag = await insertHashtag(hashtag);
        await insertPostHashtag(postId, insertingHashtag.rows[0].id);
      } else {
        await insertPostHashtag(postId, hashtagExist.rows[0].id);
      }
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
