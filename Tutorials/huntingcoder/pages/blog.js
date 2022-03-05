import React, {useState} from 'react'
import styles from '../styles/Blog.module.css'
import Link from "next/link";
import * as fs from 'fs';

// Step 1: Collect all the files form `blogdata` directory
// Step 2: Iterate through them and display them

const Blog = (props) => {
  // console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.blogItemh3}>Latest Blogs</h2>
        {blogs.map((blogItem)=>{
          return <div key={blogItem.slug} className="blogItem">
                    <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
                    <p className={styles.blogItemp} styles="max-width:2rem;">{blogItem.metadesc.substr(0,150)}...</p>
                  </div>
        })
        }
      </main>
    </div>
  )
};

// export async function getServerSideProps(context){
export async function getStaticProps(context){
  // let data = await fetch('http://localhost:3000/api/blogs')
  // let allBlogs = await data.json();
  let data = await fs.promises.readdir('blogdata')
  let allBlogs = []
  let myFile;
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myFile))
  }
  return{
    props:{allBlogs},
  }
};

export default Blog;