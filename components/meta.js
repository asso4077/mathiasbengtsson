import Head from 'next/head'
import { APP_NAME, HOME_OG_IMAGE_URL } from '../lib/const'

export default function Meta({ installed }) {
  if (installed) {
    return (
      <Head>
      <meta property="og:image" content="/public/mathiasbengtsson.jpg" />
      </Head>
    )
  }

  return null
}
