import React, { useState } from 'react'
// import {useRouter} from 'next/router'
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';

// Step 1: Find the file corresponding to the slug
// Step 2: Populate them inside the page

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog)
  function createMarkup(c) {
    return { __html: c }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1> {blog && blog.title} </h1>
        <hr />
        {
          blog
          &&
          <div dangerouslySetInnerHTML={createMarkup(blog.content)} styles="margin:0rem 15rem;"></div>
        }
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  let allBs = await fs.promises.readdir(`blogdata`)
  allBs = allBs.map((item) => {
    return { params: { slug: item.split(".")[0] } }
  })
  return {
    paths: allBs,
    fallback: true // fasle or blocking
  };
}

// export async function getServerSideProps(context){
export async function getStaticProps(context) {
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
  // let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  // let myBlog = await data.json();
  return {
    props: { myBlog: JSON.parse(myBlog) },
  }
}

export default Slug;