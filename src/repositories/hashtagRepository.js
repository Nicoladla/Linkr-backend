import connection from "../database/db.js";

export function getHashtag(hashtag) {
  return connection.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtag]);
}

export function insertHashtag(hashtag) {
  return connection.query(
    `INSERT INTO hashtags (name) VALUES ($1) RETURNING id`,
    [hashtag]
  );
}

export function insertPostHashtag(postId, hashtagId) {
  return connection.query(
    `INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2)`,
    [postId, hashtagId]
  );
}
