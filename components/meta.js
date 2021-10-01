import Head from 'next/head'
import { APP_NAME, OG_IMAGE_URL } from '../lib/const'

export default function Meta({ installed }) {
  if (installed) {
    return (
      <Head>
        <meta property="og:image" content={OG_IMAGE_URL} />
      </Head>
    )
  }

  return null
}
