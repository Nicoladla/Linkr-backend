import connection from "../database/db.js";

export function fetchFollowing(userId, followingUserId) {
  return connection.query(
    `SELECT * FROM followers WHERE "userId"=$1 AND "followingUserId"=$2`,
    [userId, followingUserId]
  );
}

export function insertFollowing(userId, followingUserId) {
  return connection.query(
    `INSERT INTO followers ("userId", "followingUserId") VALUES ($1, $2)`,
    [userId, followingUserId]
  );
}
