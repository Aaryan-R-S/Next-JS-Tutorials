import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CodesWear.com - Wear the code</title>
        <meta name="description" content="CodesWear.com - Wear the code!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className='bg-green-800 mx-3'>
        This is demo!
      </div>
    </div>
  )
}
