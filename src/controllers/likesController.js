import { insertLike, removeLike, selectAllLikes, likeCounter, searchLike } from "../repositories/likesRepository.js";

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
    const userId = res.locals.user.userId;

    try {
        const likeFound = await searchLike(userId, id);

        if (likeFound.rows.length !== 0) {
            return res.status(400).send({ message: "Você não pode dar mais de um like no mesmo post!" });
        }

        await insertLike(id, userId);
        res.status(201).send({ message: "Like realizado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function deleteLike(req, res) {

    const { id } = req.params;
    const userId = res.locals.user.userId;

    try {
        const likeFound = await searchLike(userId, id);

        if (likeFound.rows.length === 0) {
            return res.status(400).send({ message: "Você não pode dar mais de um deslike no mesmo post!" });
        }

        await removeLike(id, userId);
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}