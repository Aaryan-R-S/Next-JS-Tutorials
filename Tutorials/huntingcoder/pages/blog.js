import React, { useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from "next/link";
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component'

// Step 1: Collect all the files form `blogdata` directory
// Step 2: Iterate through them and display them

const Blog = (props) => {
  // console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);
  const fetchMoreData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
    let data = await d.json()
    setBlogs(data)
    setCount(count + 2)
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.blogItemh3}>Latest Blogs</h2>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blogItem) => {
            return <div key={blogItem.slug} className="blogItem">
              <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
              <p className={styles.blogItemp} styles="max-width:2rem;">{blogItem.metadesc.substr(0, 150)}...</p>
              <Link href={`/blogpost/${blogItem.slug}`}><button className={styles.btn}>Read more</button></Link>
            </div>
          })
          }
        </InfiniteScroll>
      </main>
    </div>
  )
};

// export async function getServerSideProps(context){
export async function getStaticProps(context) {
  // let data = await fetch('http://localhost:3000/api/blogs')
  // let allBlogs = await data.json();
  let data = await fs.promises.readdir('blogdata')
  let allCount = data.length
  let allBlogs = []
  let myFile;
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myFile))
  }
  return {
    props: { allBlogs, allCount },
  }
};

export default Blog;