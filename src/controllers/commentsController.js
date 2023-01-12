import { insertComment, commentsCounter, selectComments } from "../repositories/commentsRepository.js";

export async function postComment(req, res) {

    const postId = req.params.id;
    const { comment } = req.body;
    const userId = res.locals.user.userId;

    try {
        const pC = await insertComment(userId, postId, comment);

        return res.status(201).send({message: "Comentário inserido com sucesso!"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

export async function getComments(req, res){

    const postId = req.params.id;

    try {
        const counter = await commentsCounter(postId);
        const allComments = await selectComments(postId);

        const infoComments = [counter.rows[0], allComments.rows];
        return res.status(200).send(infoComments);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}