import styles from './studio.module.css'
import { Img } from '../../lib/image'
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react'
import Image from 'next/image'
import { contentful } from '../../lib/loaders'
import { richText } from '../../lib/text'
import { useRefDimensions } from '../../lib/utils'
import { useRouter } from 'next/router'

export default function Entry({ data, onClick }) {
  const dimRef = useRef(0)
  const { media, reference, description } = data.fields
  const { id } = reference.sys.contentType.sys
  const { push } = useRouter()

  const ratio = media.fields.file.details.image.width / media.fields.file.details.image.height

  const width = useRefDimensions(dimRef).height * ratio

  const handleClick = () => {
    push({
      pathname: `/${id === 'article' ? 'essays' : 'archive'}/[entry]`,
      query: {
        entry: reference.fields.slug
      }
    })
  }

  return (
      <>
        <figcaption>
          <div className={`ellipsis-overflow`}>
            {reference.fields.name ?? reference.fields.title}
          </div>
          <div onClick={handleClick} style={{ cursor: "pointer"}}>
            <i>View {id === 'article' ? 'essay' : 'project'}</i>
          </div>
        </figcaption>
        <div className={styles.asset} style={{ width }} ref={dimRef} onClick={onClick}>
          <Image
            src={media.fields.file.url}
            alt={media.fields.description ?? "No description available"}
            loader={contentful}
            layout={'fill'}
            objectFit={'cover'}
            objectPosition={'center'}
            />
        </div>
      </>
  )
}
