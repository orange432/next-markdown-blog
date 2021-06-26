import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import {listArticles} from '../controllers/articles';
import Header from '../components/header';

export async function getServerSideProps({params}){
  const articles = await listArticles();
  return {
    props: {articles}
  }
}

export default function Articles({articles}){
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Articles | Next Blogger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        <h1 className="pt-6 text-center text-3xl font-bold text-purple-500">Articles</h1>
        <div className="grid grid-cols-3">

        
        {articles.map((article,k)=>(
          <div key={article.slug} className="cursor-pointer hover:bg-gray-700">
            <Link href={`/articles/${article.slug}`}>
              <article className="border">
                <div className="mx-auto" style={{width: 400}}>
                <Image src={`/images/${article.image}`} width={400} height={240}/>
                </div>
              <p className="text-purple-500 uppercase text-center">{article.category}</p>
              <h2 className="text-center font-bold text-2xl">{article.title}</h2>
              </article>
            </Link>
          </div>
        ))}
        </div>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}