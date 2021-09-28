import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from './item.module.css'
import { objectToInlineList, formatDate } from '../../../lib/utils'
import Reference from './reference'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export default function Item({ data, index }) {
  const [showRef, setShowRef] = useState(false)
  const {
    authors,
    date,
    title,
    article,
    source,
    slug
  } = data

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowRef(true),
    onSwipedRight: () => setShowRef(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  const Toggle = ({ left, right }) => <div className={styles.toggle} style={left ? { left: 0 } : { right: 0 }}  onClick={() => setShowRef(!showRef)} />

  const figures = article.content.filter(k => k.content.some(f => f.nodeType === "embedded-entry-inline"))

  console.log(figures)

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys.contentType.sys;
        if (id === "media") {
          return <Reference {...node.data.target.fields} />
        }
        return <div />
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys.contentType.sys;
        if (id === "media") {
          return <Reference {...node.data.target.fields} i={figures.findIndex(f => f.content.some(k => k.data?.target?.sys?.id === node.data.target.sys.id))} anchor />
        }
        return <div />
      }
    }
  };

  return (
    <article className={styles.container + " soft-breaks block"}>
      <header className={"col-1-2"}>
        <div>{objectToInlineList(authors)}:</div>
        <h1 style={{ margin: 0 }}>{title}</h1>
      </header>
      <section className={`${styles.body} col-1-2 ${showRef ? styles.refView : styles.bodyView}`} {...handlers}>
        <div>
          {formatDate(date)}<br />
          {source}
        </div>
        <div>
          {documentToReactComponents(article, options)}
        </div>
      </section>
      <Toggle left />
      <Toggle right />
    </article>
  )
}
