import Entry from './entry'
import Featured from './featured'
import styles from './essays.module.css'

export default function Essays({ data }) {

  const featured = data.components.filter(k => k.sys.contentType.sys.id === 'slide')
  const list = data.components.filter(k => k.sys.contentType.sys.id === 'article')

  console.log(featured)

  return (
    <section className="block">
      <Container>
        {featured.map((entry, i) => (
          <Featured key={i} data={entry} />
        ))}
      </Container>
      <ul className="list list-style-none">
        {list.map((entry, i) => (
          <Entry key={i} data={entry} />
        ))}
      </ul>
    </section>
  )
}

const Container = ({ children }) => {
  return (
    <section className={styles.container}>
      <HR />
      {children}
      <HR />
    </section>
  )
}

const HR = () => {
  const dashes = []
  for (let i = 0; i < 200; i++) dashes.push('—')

  return (
    <div className={`hr`}>
      {
        dashes.map((dash, i) => <span>{dash}</span>)
      }
    </div>
  )
}
