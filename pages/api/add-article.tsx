import {createArticle} from '../../controllers/articles'

export default function handler(req,res){
  const data = {
    slug: req.body.slug,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: req.body.image,
    published: Date.now()
  };
  createArticle(data).then(resp=>{
    res.send({success: true})
  })
}