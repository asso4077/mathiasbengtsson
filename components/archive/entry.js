import styles from './archive.module.css'
import { useRouter } from 'next/router'
import { formatDate } from '../../lib/utils'
import { useState } from 'react'

export default function Entry({ data }) {
  const [hover, setHover] = useState(false)
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

  console.log(heroImage)

  return (
    <li
      className={styles.listItem}
      onClick={() => router.push({
        pathname: "/archive/[artwork]",
        query: { artwork: slug },
      })}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      >
      <span className={styles.date}>{new Date(releaseDate).getFullYear()}</span>
      <span className={styles.name}>{name}</span>
      <span className={`${styles.type} md`}>{type}</span>
      <span className={styles.material}>{material}</span>
      <span className={`${styles.dimensions} md`}>{dimensions}</span>
      {heroImage?.fields &&
        <img className={`${styles.popUpAsset} ${hover ? styles.active : styles.inactive}`} src={heroImage?.fields.file.url} alt="" />
      }
    </li>
  )
}
