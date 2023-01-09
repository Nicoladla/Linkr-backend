import connection from "../database/db.js";

export function fetchPosts() {
  return connection.query(`
    SELECT 
      posts.*, users.username, users.image 
    FROM 
      posts JOIN users 
    ON
      posts."userId" = users.id
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
