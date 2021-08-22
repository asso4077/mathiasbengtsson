import Entry from './entry'
import styles from './archive.module.css'

export default function Archive({ data, mode }) {
  return (
      <ul className={`${mode === "relative" ? styles.relative : styles.absolute} ${styles.list} list-style-none`}>
        {data.components.map((entry, i) => (
          <Entry key={i} data={entry} />
        ))}
      </ul>
  )
}
