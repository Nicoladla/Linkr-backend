import connection from "../database/db.js";

export async function insertComment(userId, postId, comment){
    return connection.query(`INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3);`, [userId, postId, comment]);
}

export async function commentsCounter(postId){
    return connection.query(`SELECT COUNT (comments."postId") as comments FROM comments WHERE "postId"=$1`, [postId]);
}

export async function selectComments(postId){
    return connection.query(`SELECT users.username, comments."userId", users.image, comments.comment FROM users JOIN comments ON users.id = comments."userId" WHERE comments."postId"=$1`, [postId]);
}