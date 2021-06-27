import Head from 'next/head'
import {useState} from 'react';
import marked from 'marked';
import Header from '../components/header';

export default function Home() {
  const [title,setTitle] = useState('');
  const [slug,setSlug] = useState('');
  const [category,setCategory] = useState('');
  const [image,setImage] = useState('');
  const [content,setContent] = useState('');
  const [message,setMessage] = useState('');
  function saveArticle(){
    if(!title || !slug || !category || !image || !content){
      setMessage('All fields must be filled');
      return;
    }
    fetch('/api/add-article',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slug,
        title,
        category,
        image,
        content: encodeURIComponent(content),
        message
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.success){
        setMessage('');
        window.location.href = "/articles/"+slug;
      }else{
        setMessage("Something went wrong when saving the article, please try again!");
      }
    })
  }

  function loadArticle(){
    fetch('/api/articles/'+slug)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      if(data){
        setContent(decodeURIComponent(data.content));
        setCategory(data.category);
        setImage(data.image);
        setTitle(data.title);
      }
    })
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Next Blogger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        <h1 className="pt-6 text-center text-3xl font-bold text-purple-500">Editor</h1>
        <p className="text-center pb-6">Create nice looking articles with markdown.</p>
        <p className="text-red-600">{message}</p>
        <div className="md:flex p-4">
          <div className="md:w-1/2">
            <h2 className="text-2xl">Details</h2>
            <div className="md:flex">
              <div className="md:w-1/2 px-4">
                <label className="text-white block mt-2">Slug</label>
                <input type="text" className="w-full rounded text-black" onChange={e=>setSlug(e.target.value)} value={slug}/>
                <label className="text-white block mt-2">Category</label>
                <input type="text" className="w-full rounded text-black" onChange={e=>setCategory(e.target.value)} value={category}/>
              </div>
              <div className="md:w-1/2 px-4">
                <label className="text-white block mt-2">Title</label>
                <input type="text" className="w-full rounded text-black" onChange={e=>setTitle(e.target.value)} value={title}/>
                <label className="text-white block mt-2">Image</label>
                <input type="text" className="w-full rounded text-black" onChange={e=>setImage(e.target.value)} value={image}/>
              </div>
              
            </div>
            <label className="text-white block ml-4 mt-2">Content</label>
            <textarea className="resize-none text-black mr-8 w-full h-96" onChange={e=>setContent(e.target.value)} value={content}></textarea>
            <div>
              <button onClick={saveArticle} className="py-2 px-4 border bg-purple-500 m-1" type="button">Save Article</button>
              <button onClick={loadArticle} className="py-2 px-4 border bg-purple-500 m-1 float-right" type="button">Load Article*</button>
            </div>
            
            <p className="text-center text-sm">* Enter the slug and click load to load an article.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <h2 className="text-2xl">Preview</h2>
            <article className="border min-h-full">
              <h1 className="text-4xl p-4 font-bold">{title}</h1>
              <img className="w-96 max-h-96 mx-auto block" src={`/images/${image}`} alt=""/>
              <div className="py-4 px-6"><span className="bg-purple-500 p-2 text-white font-bold">{category}</span></div>
              <div className="article px-4" dangerouslySetInnerHTML={{__html: marked(content)}}></div>
            </article>
          </div>
        </div>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}
