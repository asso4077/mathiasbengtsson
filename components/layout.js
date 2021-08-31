import Meta from '../components/meta'
import Alert from '../components/alert'
import Navigation from './header/navigation'

export default function Layout({ preview, children, index, page }) {
  return (
    <>
      <Meta installed />
        <Alert preview={preview} />
        <main className={page ?? "index"}>
          {children}
        </main>
    </>
  )
}
