import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/BlogPost.module.css'

// Step 1: Find the file corresponding to the slug
// Step 2: Populate them inside the page

export default function Slug() {
  const router = useRouter();
  
  const [blog, setBlog] = useState([])
  useEffect(() => {
    if(!router.isReady){return;}
    const {slug} = router.query;
    fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a)=>{
      return a.json();
    }).then((parsed)=>{
        setBlog(parsed)
      })
  }, [router.isReady])
  
  return (
    blog && <div className={styles.container}>
      <main className={styles.main}>
        <h1> {blog.title} </h1> 
        <hr />
        <div>{blog.content}</div>
      </main>
    </div>
  )
}
