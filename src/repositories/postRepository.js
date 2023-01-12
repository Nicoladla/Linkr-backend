import connection from "../database/db.js";

export function fetchPosts() {
  return connection.query(`
  SELECT 
  posts.*, null AS "repostId", users.username, users.image, null AS "userShare",false AS "repost"

FROM 
  posts JOIN users 
ON
  posts."userId" = users.id

UNION 
SELECT  p.id AS "id" ,u1.id AS "userId",p.link,p.description, r."createdAt", r.id AS "repostId",u2.username AS "username",u2.image, u1.username AS "userShare",  true AS "repost"

  FROM reposts r
  JOIN posts p
  ON r."postId" = p.id
  JOIN users u1
  ON  r."userId" = u1.id
JOIN users u2
  ON  p."userId" = u2.id

ORDER BY 
"createdAt" DESC 
LIMIT 
20

  `);
}
 
export function insertPost({ userId, link, description }) {
  return connection.query(
    `INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3) RETURNING id`,
    [userId, link, description]
  );
}
