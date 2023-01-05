import connectionDB from "../database/db.js";

export async function searchUsers(username){
    return connectionDB.query(`SELECT users.id, users."userName", users.image FROM users WHERE LOWER (users."userName") LIKE $1`, [username + "%"]);
}

export async function postsByUser(userId){
    return connectionDB.query(`SELECT users."userName", users.image, posts.* FROM users JOIN posts ON users.id = posts."userId" WHERE users.id=$1`, [userId]);
}