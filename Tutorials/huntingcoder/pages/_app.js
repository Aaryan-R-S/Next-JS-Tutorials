import '../styles/globals.css'

// -> One way to import CSS file (available globally in all components)
// import '../styles/globals.css'
// -> Another way to import CSS file (available in particular component only). Then use it as {styles.cont}
// import styles from '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
