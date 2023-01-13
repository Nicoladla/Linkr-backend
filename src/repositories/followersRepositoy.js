import connection from "../database/db.js";

export function fetchFollowingList(userId) {
  return connection.query(
    `SELECT * FROM followers WHERE "userId"=$1`,
    [userId]
  );
}

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

export function deletefollowing(followersId) {
  return connection.query(`DELETE FROM followers WHERE id=$1`, [followersId]);
}
