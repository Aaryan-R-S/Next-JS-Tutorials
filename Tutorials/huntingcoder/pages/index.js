import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      {/* Head tag of nextjs/head to inject code into head tag of HTML page */}
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keyword" content="nextjs, huntingcoder, blog, coding"/>
        <link rel="icon" href="/favicon.ico" />
        {/* To run or inject custom javascript in the application [May cause delay in pageload; bad user experience; prefer nextjs/script feature] */}
        {/* <script src='my_script.js'></script> */}
      </Head>
      
      {/* To run or inject custom javascript in the application [Inbuilt next js feature to specify when to run the script- "beforeInteractive", "afterInteractive", or "lazyOnload"] */}
      {/* <Script src="/my_script.js" strategy="lazyOnload"></Script> */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hunting Coder
        </h1>

        <p className={styles.description}>
          A blog for hunting coders by a hunting coder!
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
