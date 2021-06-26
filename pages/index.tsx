import Head from 'next/head'
import Header from '../components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Next Blogger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        
        <h1 className="pt-6 text-center text-3xl font-bold text-purple-500">Next Blogger</h1>
        <p className="text-center mt-1">Database driven markdown blog system.</p>
        
      </main>

      <footer>
        
      </footer>
    </div>
  )
}
