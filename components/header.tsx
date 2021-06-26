import React from 'react'
import Link from 'next/link';
const Header = () => {
  return (
    <div className="flex align-center justify-center">
      <Link href="/articles"><a className="px-4 py-2 hover:bg-purple-500" >Articles</a></Link>
      <Link href="/editor"><a className="px-4 py-2 hover:bg-purple-500" >Editor</a></Link>
    </div>
  )
}

export default Header
