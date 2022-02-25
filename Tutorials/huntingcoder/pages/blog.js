import React from 'react'
import styles from '../styles/Blog.module.css'
import Link from "next/link";

// Step 1: Collect all the files form `blogdata` directory
// Step 2: Iterate through them and display them

export default function Blog() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Latest Blogs</h2>
        <div className="blogItem">
          <Link href={'/blogpost/learn-javascript'}><h3 className={styles.blogItemh3}>How to learn JavaScript in 2022?</h3></Link>
          <p>JavaScritp is the language used to design logic for the web</p>
        </div>
        <div className="blogItem">
          <h3 className={styles.blogItemh3}>How to learn JavaScript in 2022?</h3>
          <p>JavaScritp is the language used to design logic for the web</p>
        </div>
        <div className="blogItem">
          <h3 className={styles.blogItemh3}>How to learn JavaScript in 2022?</h3>
          <p>JavaScritp is the language used to design logic for the web</p>
        </div>
      </main>
    </div>
  )
}
