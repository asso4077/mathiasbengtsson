import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Asset from './asset'
import styles from './assets.module.css'
import Header from '../../header/index'
import Archive from '../index'

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

  return (
    <article className={styles.container}>
    <section className={styles.introduction + " block soft-breaks"}>
      <Header index={index} />
        <h1>–{title}–</h1>
        {documentToReactComponents(textField)}
    </section>
      {assets.map((asset, i) => (
        <Asset data={asset} key={i} i={i} />
      ))}
      <div className={styles.related}>
        <Header index={index} />
        <Archive data={archive} mode={"relative"} />
      </div>
    </article>
  )
}
