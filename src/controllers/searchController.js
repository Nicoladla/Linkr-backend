import { searchUsers, postsByUser, infoByUser } from "../repositories/searchRepository.js";
import metadataLink from "../helpers/MetadataLinkHelper.js";

export async function getUsers(req, res) {
    
    const {username} = req.query;

    if(username){
        try {
            const usernameLower = username.toLowerCase();

            const users = await searchUsers(usernameLower);
            return res.status(200).send(users.rows);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

}

export async function getPostsByUser(req, res){

    const { id } = req.params;

    try {
        const posts = await postsByUser(id);
        const infoUser = await infoByUser(id);

        const postsWithMetadata = await metadataLink(posts.rows);

        const info = [infoUser.rows[0], postsWithMetadata];
        return res.status(200).send(info);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }

}
