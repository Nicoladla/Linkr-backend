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

export async function likeCounter(postId){
    return connectionDB.query(`SELECT COUNT (likes."postId") as likes FROM likes WHERE "postId"=$1`, [postId]);
}

export async function searchUsers(username){
    return connectionDB.query(`SELECT users.id, users."userName", users.image FROM users WHERE LOWER (users."userName") LIKE $1`, [username + "%"]);
}

export async function postsByUser(userId){
    return connectionDB.query(`SELECT users."userName", users.image, posts.* FROM users JOIN posts ON users.id = posts."userId" WHERE users.id=$1`, [userId]);
}