import connection from "../database/db.js";

export async function insertLike(postId, userId) {
    return connection.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [userId, postId]);
}

export async function removeLike(postId, userId){
    return connection.query(`DELETE FROM likes WHERE "userId"=$1 AND postId=$2`, [userId, postId]);
}

export async function selectAllLikes(postId){
    return connection.query(`SELECT username, "userId" FROM users JOIN likes ON users.id = "userId" WHERE "postId"=$1`, [postId]);
}

export async function likeCounter(postId){
    return connection.query(`SELECT COUNT (likes."postId") as likes FROM likes WHERE "postId"=$1`, [postId]);
}