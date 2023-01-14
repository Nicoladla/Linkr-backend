import connection from "../database/db.js";

export function fetchPosts(userId) {
  return connection.query(`
  SELECT 
    posts.*, null AS "repostId", users.username, users.image, null AS "userShare",null AS "userShareId",false AS "repost"

  FROM 
    posts JOIN users 
  ON
    posts."userId" = users.id
  JOIN 
    followers
  ON
    posts."userId" = followers."followingUserId"
  WHERE 
    followers."userId"= $1
  

UNION 
SELECT  p.id AS "id" ,u2.id AS "userId",p.link,p.description, r."createdAt", r.id AS "repostId",u2.username AS "username",u2.image, u1.username AS "userShare",u1.id AS "userShareId",  true AS "repost"

  FROM reposts r
    JOIN posts p
      ON r."postId" = p.id
    JOIN users u1
      ON  r."userId" = u1.id
    JOIN users u2
      ON  p."userId" = u2.id
    JOIN followers
      ON r."userId" = followers."followingUserId"
      OR r."userId" = followers."userId"
  WHERE followers."userId"= $1

ORDER BY 
"createdAt" DESC 
LIMIT 
20

  `, [userId]);
}

export function insertPost({ userId, link, description }) {
  return connection.query(
    `INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3) RETURNING id`,
    [userId, link, description]
  );
}
