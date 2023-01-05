import connectionDB from "../database/db.js";

export async function insertLike(postId, userId) {
    return connectionDB.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [userId, postId]);
}

export async function removeLike(postId, userId){
    return connectionDB.query(`DELETE FROM likes WHERE "userId"=$1 AND postId=$2`, [userId, postId]);
}

export async function selectAllLikes(postId){
    return connectionDB.query(`SELECT username, "userId" FROM users JOIN likes ON users.id = "userId" WHERE "postId"=$1`, [postId]);
}