import Article from '../models/article';

export async function listArticles(){
  let articles = await Article.findAll();
  let articleList = articles.map((article: any)=>({
    slug: article.dataValues.slug,
    category: article.dataValues.category,
    title: article.dataValues.title,
    content: article.dataValues.content,
    image: article.dataValues.image,
    published: article.dataValues.published
  }))
  return articleList;
}

export async function getArticle(slug: string){
  let search: any = await Article.findOne({where: {slug}});
  if(!search){
    return '';
  }
  const article = search.dataValues;
  const content = {
    slug: article.slug,
    category: article.category,
    title: article.title,
    content: article.content,
    image: article.image,
    published: article.published
  }
  return content;
}

export async function createArticle(data){
  await Article.sync();
  let search = await Article.findOne({where: {slug: data.slug}});

  if(search){
    
  }
  await Article.create(data);
  return true;
}