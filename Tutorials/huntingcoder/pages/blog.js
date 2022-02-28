import React, {useEffect, useState} from 'react'
import styles from '../styles/Blog.module.css'
import Link from "next/link";

// Step 1: Collect all the files form `blogdata` directory
// Step 2: Iterate through them and display them

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/blogs').then((a)=>{
      return a.json();
    }).then((parsed)=>{
        setBlogs(parsed)
      })
  }, [])
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.blogItemh3}>Latest Blogs</h2>
        {blogs.map((blogItem)=>{
          return <div key={blogItem.slug} className="blogItem">
                    <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
                    <p className={styles.blogItemp}>{blogItem.content.substr(0,150)}...</p>
                  </div>
        })
        }
      </main>
    </div>
  )
}
