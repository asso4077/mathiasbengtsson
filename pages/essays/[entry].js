import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout'
import { APP_NAME, OG_IMAGE_URL, PAGE_DESCRIPTION } from '../../lib/const'
import { fetchEntries, fetchIndex } from '../../lib/api'
import Item from '../../components/essays/item/index'
import Header from '../../components/header/index'

export default function Page({ page, preview, index }) {
  const router = useRouter()
  if (!router.isFallback && !page) return <p>Error</p>
  if (!page.slug) return <p>Error</p>

  return (
    <Layout preview={preview} page={page.slug}>
      <Head>
        <title>
          {APP_NAME}: {page.title}
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
      <Header index={index} margin />
      <Item data={page} />
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const query = { content_type: 'article', 'fields.slug': params.entry, limit: 1, include: 5 }
  const page = await fetchEntries(preview, query)

  const index = (await fetchIndex(preview)) ?? []

  return {
    props: {
      preview,
      page: page?.items[0]?.fields ?? null,
      index: index?.items[0]?.fields ?? null
    },
  }
}

export async function getStaticPaths( preview = false ) {
  const query = { content_type: 'page', 'fields.slug': "essays", limit: 1 }
  const index = await fetchEntries(preview, query)
  const paths = index.items[0].fields.components

  return {
    paths: paths.map(path => `/essays/${path.fields.slug}`) ?? [],
    fallback: false,
  }
}
