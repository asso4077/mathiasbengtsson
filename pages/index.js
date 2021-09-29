import Head from 'next/head'
import Layout from '../components/layout'
import { fetchIndex, fetchEntries } from '../lib/api'
import { APP_NAME, OG_IMAGE_URL, PAGE_DESCRIPTION } from '../lib/const'
import { getRandomInt } from '../lib/utils'
import Figure from '../components/index/figure'

export default function Home({ preview, index, page }) {
  return (
    <Layout preview={preview} index={index}>
      <Head>
        <title>
          {APP_NAME}
        </title>
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta
          name="description"
          content={page.description ?? PAGE_DESCRIPTION}
        />
        <meta
          name="og:description"
          content={page.description ?? PAGE_DESCRIPTION}
        />
      </Head>
      <Figure
        data={page.components[getRandomInt(page.components.length)].fields}
        />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const index = (await fetchIndex(preview)) ?? []
  const query = { content_type: 'page', 'fields.slug': 'index', limit: 1, include: 3 }
  const page = await fetchEntries(preview, query)

  return {
    props: {
      preview,
      index: index.items[0].fields,
      page: page.items[0].fields
    },
  }
}
