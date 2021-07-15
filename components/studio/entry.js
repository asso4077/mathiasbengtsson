import styles from './studio.module.css'
import { Img } from '../../lib/image'
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react'

export default function Entry({ data, display, i, state }) {
  const { media, artwork } = data.fields
  const [progress, setProgress] = state

  const { ref, inView, entry } = useInView({
    threshold: .5,
  })

  useEffect(() => {
    if (i !== progress && inView === true) {
      setProgress(i)
    }
  }, [inView])

  const isLandscape = media.fields.file.details.image.width > media.fields.file.details.image.height

  return (
    <div className={styles.assetContainer}>
      <figure className={styles.asset + " " + (isLandscape ? styles.landscape : styles.portrait)} ref={ref}>
        <Img
          src={media.fields.file.url}
          width={media.fields.file.details.image.width}
          height={media.fields.file.details.image.height}
          alt={media.fields.description ?? "No description available"}
          />
      </figure>
    </div>
  )
}
