import styles from './assets.module.css'
import { Img } from '../../../lib/image'
import slugify from 'react-slugify'
import { use100vh } from 'react-div-100vh'

export default function Asset({ data, i }) {
  if (!data.fields) return null

  const {
    asset,
    caption,
    fullscreen,
    rightAligned,
    layout
  } = data.fields

  console.log(slugify(layout))
  const height = use100vh()


  const position = rightAligned === true ? " right-aligned " : rightAligned === false ? " left-aligned " : " centered "
  const isFullscreen = fullscreen ? "fullscreen" : "margins"
  return (
    <figure className={`${styles.asset} asset-grid ${slugify(layout)}`} style={{ height: height }}>
      {asset?.fields?.file &&
        <Img
          src={asset.fields.file.url}
          width={asset.fields.file.details.image.width}
          height={asset.fields.file.details.image.height}
          alt={asset.fields.description ?? "No description is available"}
          />
      }
      {caption &&
        <figcaption>
          {caption}
        </figcaption>
      }
      <div className={"reference"}>
        {i + 1}
      </div>
    </figure>
  )
}
