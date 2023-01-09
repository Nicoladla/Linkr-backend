import connection from "../database/db.js";

export async function searchUsers(username){
    return connection.query(`SELECT users.id, users."username", users.image FROM users WHERE LOWER (users."username") LIKE $1`, [username + "%"]);
}

export async function postsByUser(userId){
    return connection.query(`SELECT users.username, users.image, posts.* FROM users JOIN posts ON users.id = posts."userId" WHERE users.id=$1 ORDER BY 
    "createdAt" DESC`, [userId]);
}