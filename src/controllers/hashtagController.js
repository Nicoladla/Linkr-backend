import metadataLink from "../helpers/MetadataLinkHelper.js";
import {
  getHashtag,
  getTrendingHashtags,
  insertHashtag,
  insertPostHashtag,
  selectHashtag,
} from "../repositories/hashtagRepository.js";

export async function postHashtag(req, res) {
  const { description } = req.body;
  const { postId } = res.locals;

  const regex = /(#[a-z0-9][a-z0-9\-_]*)/gi;
  const hashtags = description?.match(regex);
 
  try {
    if (!hashtags) return res.sendStatus(201);

    hashtags.forEach(async (hashtag) => {
      const hashtagExist = await getHashtag(hashtag);

      if (hashtagExist.rowCount === 0) {
        const insertingHashtag = await insertHashtag(hashtag);
        await insertPostHashtag(postId, insertingHashtag.rows[0].id);
      } else {
        await insertPostHashtag(postId, hashtagExist.rows[0].id);
      }
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getTrendig(req,res){
  try {
    const trendingHashtags = await getTrendingHashtags();
    res.status(201).send(trendingHashtags.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getHashtagByName(req,res){
  const {hashtag}=req.params;
 
  try {
    const { rows: posts } = await selectHashtag(`#${hashtag}`);
  
    const postsWithMetadata = await metadataLink(posts);

    res.status(200).send(postsWithMetadata);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }

}
