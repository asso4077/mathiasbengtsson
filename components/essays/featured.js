import styles from './essays.module.css'
import { useRouter } from 'next/router'
import { objectToInlineList, formatDate } from '../../lib/utils'
import Image from 'next/image'
import { contentful } from '../../lib/loaders'

export default function Featured({ data }) {
  const router = useRouter()

  const {
    media,
    reference,
    title
  } = data.fields

  if (reference.sys.contentType.sys.id !== 'article') return null

  return (
    <div
      className={styles.featuredItem}
      >
      <figure
        onClick={() => router.push({
          pathname: "/essays/[essay]",
          query: { essay: reference.fields.slug },
        })}>
        <Image
          src={media.fields.file.url}
          width={media.fields.file.details.image.width}
          height={media.fields.file.details.image.height}
          alt={media.fields.description ?? "No description available"}
          loader={contentful}
          layout={'responsive'}
          />
      </figure>
      <div className={styles.info}>
        <div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => router.push({
              pathname: "/essays/[essay]",
              query: { essay: reference.fields.slug },
            })}>
            &ldquo;{reference.fields.title}&rdquo;
          </div>
          by {objectToInlineList(reference.fields.authors)} ({formatDate(reference.fields.date)})<br />
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => router.push({
            pathname: "/essays/[essay]",
            query: { essay: reference.fields.slug },
          })}>
          <i>Read essay</i>
        </div>
      </div>
    </div>
  )
}
