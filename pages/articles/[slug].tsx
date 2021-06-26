import {getArticle} from '../../controllers/articles';
import Head from 'next/head';
import marked from 'marked';
import Header from '../../components/header';
export async function getServerSideProps({params}){
  let content = await getArticle(params.slug);
  if(!content){
    content = {
      slug: "",
      image: "",
      published: Date.now(),
      title: "Page not found!",
      category: "Error!",
      content: "**Page not found! Please make sure the slug is correct**"
    }
  }
  console.log(content);
  return {
    props: {content}
  }
}

const Article = ({content}) => {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header/>
    <div className="container mx-auto">
      <Head>
        <title>{content.title} | Next Blogger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="border min-h-full">
        <h1 className="text-4xl p-4 font-bold">{content.title}</h1>
        <img className="w-96 mx-auto block max-h-96" src={`/images/${content.image}`} alt=""/>
        <div className="py-4 px-6"><span className="bg-purple-500 p-2 text-white font-bold">{content.category}</span></div>
        <div className="article px-4" dangerouslySetInnerHTML={{__html: marked(decodeURIComponent(content.content))}}></div>
      </article>
    </div>
    </div>
  )
};

export default Article;