import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Asset from './asset'
import styles from './assets.module.css'
import Header from '../../header/index'
import Archive from '../index'
import { HR } from '../../ornament/'

export default function Item({ data, index, archive }) {
  const {
    heroImage,
    material,
    dimensions,
    name,
    title,
    textField,
    assets,
    releaseDate,
    type,
    slug
  } = data

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    }
  }

  return (
    <article className={styles.container}>
    <section className={styles.introduction + " block soft-breaks"}>
      <Header index={index} />
    <div className={styles.body}>
    <HR />
      {documentToReactComponents(textField, options)}
      <HR />
      </div>

    </section>
      {assets && assets.map((asset, i) => (
        <Asset data={asset} key={i} i={i} />
      ))}
      <div className={styles.related}>
        <Header index={index} />
        <Archive data={archive} mode={"relative"} />
      </div>
    </article>
  )
}
