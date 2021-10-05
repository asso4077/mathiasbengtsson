import Head from 'next/head'
import { APP_NAME, OG_IMAGE_URL } from '../lib/const'

export default function Meta({ installed }) {
  if (installed) {
    return (
      <Head>
        <meta property="og:image" content={OG_IMAGE_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com"> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@0;1&display=swap" rel="stylesheet">
      </Head>
    )
  }

  return null
}
