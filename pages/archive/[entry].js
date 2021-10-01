import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout'
import { APP_NAME, OG_IMAGE_URL, PAGE_DESCRIPTION } from '../../lib/const'
import { fetchEntries, fetchAllSlugs, fetchIndex } from '../../lib/api'
import Item from '../../components/archive/item/index'

export default function Page({ page, preview, index, archive }) {
  console.log(archive)
  const router = useRouter()
  if (!router.isFallback && !page) {return <p>Error</p>}
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
      <Item data={page} archive={archive} index={index} />
    </Layout>
  )
}

export async function getStaticPaths( preview = false ) {
  const index = await fetchAllSlugs(preview, "artwork")
  const paths = index.items.map(path => `/archive/${path.fields.slug}`) ?? []

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const query = { content_type: 'artwork', include: 5, limit: 1, 'fields.slug': params.entry }
  const page = await fetchEntries(preview, query)

  const index = (await fetchIndex(preview)) ?? []

  const query2 = { content_type: 'page', 'fields.slug': 'archive', limit: 1, include: 3 }
  const archive = await fetchEntries(preview, query2)

  return {
    props: {
      preview,
      page: page.items[0].fields ?? null,
      archive: archive.items[0].fields ?? null,
      index: index.items[0].fields
    },
  }
}
