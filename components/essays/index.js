import Entry from './entry'

export default function Essays({ data }) {

  const featured = data.components.filter(k => k.sys.contentType.sys.id === 'slide')
  const list = data.components.filter(k => k.sys.contentType.sys.id === 'article')

  console.log(featured)

  return (
    <section className="block">
      <ul className="list list-style-none">
      {list.map((entry, i) => (
        <Entry key={i} data={entry} />
      ))}
      </ul>
    </section>
  )
}
