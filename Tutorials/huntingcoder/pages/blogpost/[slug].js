import React, {useState} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/BlogPost.module.css'

// Step 1: Find the file corresponding to the slug
// Step 2: Populate them inside the page

export default function Slug(props) {
  const [blog, setBlog] = useState(props.myBlog)
  
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

export async function getServerSideProps(context){
  const {slug} = context.query;
  let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  let myBlog = await data.json();
  return{
    props:{myBlog},
  }
}
