import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Navbar() {
  return (
    <div>
      <nav className={styles.mainnav}>
        <ul>
          <Link href="/"><a><li>Home</li></a></Link>
          <Link href="/about"><a><li>About</li></a></Link>
          <Link href="/blog"><a><li>Blog</li></a></Link>
          <Link href="/contact"><a><li>Contact</li></a></Link>
        </ul>
      </nav>
    </div>
  )
}
