import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout'
import { APP_NAME, OG_IMAGE_URL, PAGE_DESCRIPTION } from '../lib/const'
import { fetchEntries, fetchAllSlugs, fetchIndex } from '../lib/api'
import dynamic from 'next/dynamic'
import Header from '../components/header/index'

export default function Page({ page, preview, index }) {
  const router = useRouter()
  if (!router.isFallback && !page) {return <p>Error</p>}
  if (!page.slug) return <p>Error</p>

  const DynamicComponent = dynamic(
    () => import(`../components/${page.slug}/index`),
    { ssr : false }
  )

  return (
    <Layout preview={preview} index={index} page={page.slug}>
      <Head>
        <title>
          {APP_NAME}: {page.title}
        </title>
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta name="description" content={page.description ?? PAGE_DESCRIPTION} />
        <meta name="og:description" content={page.description ?? PAGE_DESCRIPTION} />
      </Head>
      <Header index={index} margin fixed={page.slug === "studio"} />
      <h1 className="sr-only">{page.title}</h1>
      <DynamicComponent data={page} />
    </Layout>
  )
}

export async function getStaticPaths( preview = false ) {
  const paths = await fetchAllSlugs(preview, "page")

  return {
    paths: paths.items.map(path => `/${path.fields.slug}`) ?? [],
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const query = { content_type: 'page', 'fields.slug': params.page, limit: 1, include: 3, 'fields.slug[ne]': 'index' }
  const page = await fetchEntries(preview, query)

  const index = (await fetchIndex(preview)) ?? []

  return {
    props: {
      preview,
      page: page.items[0].fields ?? null,
      index: index.items[0].fields
    },
  }
}
