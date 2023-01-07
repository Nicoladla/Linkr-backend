import connection from "../database/db.js";

export function insertPost({ userId, link, description }) {
  return connection.query(
    `INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3) RETURNING id`,
    [userId, link, description]
  );
}
