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

export function getTrendingHashtags(){
  return connection.query(
    ` SELECT hashtags.id, hashtags.name, COUNT("postsHashtags"."hashtagId") AS count
    FROM hashtags 
    JOIN "postsHashtags"
    ON "postsHashtags"."hashtagId" = hashtags.id
    GROUP BY hashtags.id
    ORDER BY count DESC
    LIMIT 10`
  )
}

export function selectHashtag(hashtag){
 
  return connection.query(`
  SELECT posts.*, users.username,users.image
  FROM hashtags
  JOIN "postsHashtags"
  ON "postsHashtags"."hashtagId" = hashtags.id
  JOIN posts 
  ON posts.id = "postsHashtags"."postId"
  JOIN users 
  ON users.id = posts."userId"
  WHERE hashtags.name =$1
  ORDER BY posts."createdAt" DESC
  LIMIT 20
    `, 
    [hashtag]);
}