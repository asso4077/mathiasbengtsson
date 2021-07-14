import styles from './archive.module.css'
import { useRouter } from 'next/router'
import { formatDate } from '../../lib/utils'

export default function Entry({ data }) {
  const router = useRouter()

  const {
    heroImage,
    material,
    dimensions,
    name,
    releaseDate,
    type,
    slug
  } = data.fields

  return (
    <li
      className={styles.listItem}
      onClick={() => router.push({
        pathname: "/archive/[artwork]",
        query: { artwork: slug },
      })}
      >
      <span className={styles.date}>{new Date(releaseDate).getFullYear()}</span>
      <span className={styles.name}>{name}</span>
      <span className={`${styles.type} md`}>{type}</span>
      <span className={styles.material}>{material}</span>
      <span className={`${styles.dimensions} md`}>{dimensions}</span>
    </li>
  )
}
