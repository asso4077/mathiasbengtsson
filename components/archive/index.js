import Entry from './entry'
import styles from './archive.module.css'

export default function Archive({ data, mode }) {
  return (
      <ul className={`${mode === "relative" ? styles.relative : styles.absolute} ${styles.list} list-style-none`}>
        <li className={styles.listHeader}>
          <div className={`${styles.date} md`}>Year</div>
          <div className={`${styles.name} md`}>Title</div>
          <div className={`${styles.type} md`}>Category</div>
          <div className={`${styles.material} md`}>Material(s)</div>
          <div className={`${styles.dimensions} md`}>Dimensions</div>
        </li>
        {data.components.map((entry, i) => (
          <Entry key={i} data={entry} />
        ))}
      </ul>
  )
}
