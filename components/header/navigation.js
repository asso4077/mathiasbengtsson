import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Navigation({ index }) {

  return (
    <nav>
      <div>
        Menu
      </div>
      <ul>
        {index.pages.map((page, i) => (
          <Li key={i} data={page} />
        ))}
      </ul>
    </nav>
  )
}

function Li({ data }) {
  const { slug, title } = data.fields
  const router = useRouter()
  const active = router.query.page === slug
  const archive = router.query.entry && (slug === "archive") && (router.pathname.includes('archive'))
  const essays = router.query.entry && (slug === "essays") && (router.pathname.includes('essays'))

  return (
    <li className={active || archive || essays ? `active` : ``}>
      <Link href={`/${slug}`}>
        {title}
      </Link>
    </li>
  )
}
