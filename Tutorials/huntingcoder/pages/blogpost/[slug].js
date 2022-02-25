import React from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/BlogPost.module.css'

// Step 1: Find the file corresponding to the slug
// Step 2: Populate them inside the page

export default function Slug() {
    const router = useRouter();
    const {slug} = router.query;
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          Title of the Page: {slug}
        </h1> 
        <hr />
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab accusantium atque eius consectetur voluptatum nobis, pariatur architecto repellendus quas. Saepe ipsam placeat maxime, esse labore doloribus cum neque velit, quo dolorum corrupti, nobis dolores quasi repellat sint dolorem. Aspernatur, distinctio.</div>
      </main>
    </div>
  )
}
