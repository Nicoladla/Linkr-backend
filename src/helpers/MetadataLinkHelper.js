
import urlMetadata from "url-metadata";
import { countReposts } from "../repositories/repostRepository.js";

export default async function metadataLink(posts) {
  const postsWithMetadata = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
const repostCount = await countReposts (post.id)

    try {
      const { title, image, description } = await urlMetadata(post.link);

      postsWithMetadata.push({
        ...post,
        repostCount: repostCount.rows[0].count ,
        metadataLink: { title, image, description },
      });
    } catch (error) {
      console.log(error);
      postsWithMetadata.push({ repostCount: repostCount.rows[0].count ,...post,linkMetadata: "Error" });
    }
  }

  return postsWithMetadata;
}
