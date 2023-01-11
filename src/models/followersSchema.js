import joi from "joi";

export const followersSchema = joi.object({
  followingUserId: joi.number().min(1).required(),
});
