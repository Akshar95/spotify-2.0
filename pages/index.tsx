import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from "../Components/Sidebar"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* player */}</div>


    </div>
  )
}

export default Home
