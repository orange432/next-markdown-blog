import { getArticle } from "../../../controllers/articles";

export default async function handler(req,res){
  const {slug} = req.query;
  let article = await getArticle(slug);
  res.json(article);
}