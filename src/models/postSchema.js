import joi from "joi"

export const postSchema = joi.object({
    link: joi.string().uri(),
    description: joi.string().min(1)
})