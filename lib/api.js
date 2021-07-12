const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const previewAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

const previewClient = require('contentful').createClient({
  space: space,
  accessToken: previewAccessToken,
  host: 'preview.contentful.com',
})

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug, preview = true) {
  const entry = await getClient(preview).getEntries({
    content_type: 'project',
    limit: 1,
    'fields.slug[in]': slug
  })
  return entry.items[0].fields
}

export async function getPreviewPostById(id, preview = true) {
  const entry = await getClient(preview).getEntry(id)
  return entry
}

export async function fetchAllSlugs(preview, contentType) {
  const paths = await client.getEntries({
    content_type: contentType,
    'fields.slug[exists]': true,
    select: 'fields.slug',
    'fields.slug[ne]': 'index'
  })
  return paths
}

export async function fetchIndex(preview) {
  const index = await getClient(preview).getEntries({ content_type: 'index', limit: 1, order: '-sys.updatedAt' })
  return index
}

export async function fetchEntries(preview, query) {
  const entry = await getClient(preview).getEntries(query)
  return entry
}
