import { useState, useRef, useEffect } from 'react'
import Entry from './entry'
import Indicator from './indicator'
import styles from './studio.module.css'
import { use100vh } from 'react-div-100vh'

const INCREMENT = 200

export default function Studio({ data }) {
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(0)
  const refs = useRef([])
  const height = use100vh()

  useEffect(() => {
    if (refs.current[inView]) {
      refs.current[inView].scrollIntoView({ behavior: "smooth", inline: "start" })
    }
  }, [inView])

  return (
    <div className={styles.container}>
      <div className={styles.snap} style={{ height }}>
          {data.components.map((entry, i) => (
            <figure
              key={i}
              className={styles.assetContainer}
              ref={(e) => { refs.current[i] = e }}
              >
              <Entry
                data={entry}
                onClick={() => setInView(inView + 1 >= data.components.length ? 0 : inView + 1)}
              />
            </figure>
          ))}
      </div>
    </div>
  )
}
