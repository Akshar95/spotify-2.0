import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from "../Components/Sidebar"

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>this a spotify build</h1>

      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* player */}</div>


    </div>
  )
}

export default Home
