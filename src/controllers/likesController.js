import { insertLike, removeLike, selectAllLikes } from "../repositories/likesRepository.js";

export async function getLikes(req, res) {

    const { id } = req.params;

    try {
        const likes = await selectAllLikes(id);
        return res.status(200).send(likes.rows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function postLike(req, res) {

    const { id } = req.params;

    try {
        await insertLike(id, userId);
        res.status(201).send({ message: "Like realizado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function deleteLike(req, res) {

    const { id } = req.params;

    try {
        const like = await removeLike(id, userId);
        return res.status(200).send(like.rows); //trocar pra status 204 depois
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}