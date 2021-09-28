import styles from './item.module.css'
import ReactMarkdown from 'react-markdown'
import { Img } from '../../../lib/image'
import slugify from 'react-slugify'

export default function Reference(props) {
  console.log(props)
  const { asset, caption, layout, i, anchor } = props

  if (!asset) {
    return <TextOnly data={caption} i={i} />
  }

  console.log(i)
  const isLandscape = asset.fields.file.details.image.width >= asset.fields.file.details.image.height
  const isFullscreen = slugify(layout).includes('fullscreen')

  return (
    <span className={styles.inlineRef}>
      {anchor && `(${i + 1})`}
    <div className={`figure ${isLandscape ? styles.landscape : styles.portrait} ${isFullscreen && isLandscape ? styles.fullscreen : styles.inline}`}>
      <div className={styles.reference}>
        {
          i !== undefined
          ? `${i + 1}${!isFullscreen && ":"}`
          : null
        }
      </div>
      <Img
        className={styles.asset}
        src={asset.fields.file.url}
        width={asset.fields.file.details.image.width}
        height={asset.fields.file.details.image.height}
        alt={asset.fields.description ?? "No description available"}
        />
      {caption &&
        <figcaption className={styles.caption}>
          <ReactMarkdown components={{p: 'span'}}>
            {caption}
          </ReactMarkdown>
        </figcaption>
      }
    </div>
    </span>
  )
}

function TextOnly({ data, i }) {

  if (!data) return null

  return (
    <span className={styles.inlineRef}>({i + 1})
      <span className={styles.inline}>
        <span>{i + 1}:</span>
        <ReactMarkdown components={{p: 'span'}}>
          {data}
        </ReactMarkdown>
      </span>
    </span>
  )
}
