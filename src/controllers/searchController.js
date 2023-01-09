import { searchUsers, postsByUser } from "../repositories/searchRepository.js";

export async function getUsers(req, res) {
    
    const {username} = req.query;

    if(username){
        try {
            const usernameLower = username.toLowerCase();

            const users = await searchUsers(usernameLower);
            return res.status(200).send(users.rows);
        } catch (error) {
            return res.status(500).send({message: error.message});
            console.log(error);
        }
    }

}

export async function getPostsByUser(req, res){

    const { id } = req.params;

    try {
        const posts = await postsByUser(id);
        return res.status(200).send(posts.rows);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }

}
