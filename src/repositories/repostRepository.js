import connection from "../database/db.js";



export function insertRepost( userId, postId) {
  return connection.query(
    `INSERT INTO reposts ("userId", "postId") VALUES ($1, $2);`,
    [userId, postId]
  );
}

export function countReposts(postId) {
    return connection.query(
      `SELECT COUNT("postId") AS count FROM reposts WHERE "postId"=$1 ;`,
      [ postId]
    );
  }
