import { commentSchema } from "../models/commentSchema.js";

export async function isCommentOk(req, res, next) {

    const validationStatus = commentSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(400).send(error);
        return;
    };

    next();

}