import styles from './archive.module.css'
import { useRouter } from 'next/router'
import { formatDate } from '../../lib/utils'
import { useState } from 'react'
import Image from 'next/image'
import { contentful } from '../../lib/loaders'
import { HR } from '../ornament/'

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
      <HR className={`sm`} />
      {heroImage?.fields &&
        <div className={`${styles.heroImage} ${hover ? styles.active : styles.inactive}`}>
          <Image
            src={heroImage?.fields.file.url}
            alt={heroImage?.fields.description ?? "No description available of this image"}
            loader={contentful}
            layout={"fill"}
            objectFit={"contain"}
            priority="true"
            />
        </div>
      }
      <div className={styles.date}>{new Date(releaseDate).getFullYear()}</div>
      <div className={styles.name}>{name}</div>
      <div className={`${styles.type} md`}>{type}</div>
      <div className={styles.material}>{material}</div>
      <div className={`${styles.dimensions} md`}>{dimensions}</div>
    </li>
  )
}
