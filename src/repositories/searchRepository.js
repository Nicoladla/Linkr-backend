import connection from "../database/db.js";

export async function searchUsers(username){
    return connection.query(`SELECT users.id, users."username", users.image FROM users WHERE LOWER (users."username") LIKE $1`, [username + "%"]);
}

export async function postsByUser(userId){
    return connection.query(`SELECT * FROM posts WHERE posts."userId"=$1 ORDER BY "createdAt" DESC`, [userId]);
}

export async function infoByUser (userId){
    return connection.query(`SELECT username, image FROM users WHERE id=$1`, [userId]);
}