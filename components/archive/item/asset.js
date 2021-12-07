import styles from './assets.module.css'
import { Img } from '../../../lib/image'
import Video from '../../video/'
import slugify from 'react-slugify'
import { use100vh } from 'react-div-100vh'

export default function Asset({ data, i }) {
  if (!data.fields.asset) return null

  const {
    asset,
    caption,
    fullscreen,
    rightAligned,
    layout
  } = data.fields

  const height = use100vh()

  const position = rightAligned === true ? " right-aligned " : rightAligned === false ? " left-aligned " : " centered "
  const isFullscreen = fullscreen ? "fullscreen" : "margins"
  return (
    <figure className={`${styles.asset} asset-grid ${slugify(layout)}`} style={{ height: height }}>
      {
        asset.fields.file.contentType.includes('image')
        ? <Img
            src={asset.fields.file.url}
            width={asset.fields.file.details.image.width}
            height={asset.fields.file.details.image.height}
            alt={asset.fields.description ?? "No description is available"}
            />
        : <Video
            src={asset.fields.file.url}
            controls={!slugify(layout).includes('fullscreen')}
            muted={slugify(layout).includes('fullscreen')}
            loop={slugify(layout).includes('fullscreen')}
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
