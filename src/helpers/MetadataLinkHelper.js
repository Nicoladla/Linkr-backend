import urlMetadata from "url-metadata";

export default async function metadataLink(posts) {
  const postsWithMetadata = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    try {
      const { title, image, description } = await urlMetadata(post.link);

      postsWithMetadata.push({
        ...post,
        metadataLink: { title, image, description },
      });
    } catch (error) {
      console.log(error);
      postsWithMetadata.push({ ...post, linkMetadata: "Error" });
    }
  }

  return postsWithMetadata;
}
