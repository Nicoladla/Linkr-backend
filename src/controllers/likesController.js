import { insertLike, removeLike, selectAllLikes, likeCounter } from "../repositories/likesRepository.js";

export async function getLikes(req, res) {

    const { id } = req.params;

    try {
        const likes = await selectAllLikes(id);
        const counter = await likeCounter(id);

        const infoLikes = [counter.rows[0], likes.rows];
        return res.status(200).send(infoLikes);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function postLike(req, res) {

    const { id } = req.params;
    const { userId } = req.body;

    try {
        await insertLike(id, userId);
        res.status(201).send({ message: "Like realizado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function deleteLike(req, res) {

    const { id } = req.params;
    const { userId } = req.body;

    try {
        const like = await removeLike(id, userId);
        return res.status(200).send(like.rows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}