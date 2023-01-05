import connection from "../database/db.js";

export async function checkEmail(email){
    return connection.query(
        `SELECT * FROM users WHERE email= $1;`, [email]);
}

export async function checkUsername(username){
    return connection.query(
        `SELECT * FROM users WHERE username= $1;`, [username]);
}
export async function selectUser (userId){
    return connection.query(
        `SELECT * FROM users WHERE id= $1;`, [userId]);
}
export async function insertUser(username,email,passwordHash,image){
    return  connection.query(
        `INSERT INTO users("username","email",password,image) VALUES ($1,$2,$3,$4);`,
        [username,email,passwordHash,image]
      );
}
