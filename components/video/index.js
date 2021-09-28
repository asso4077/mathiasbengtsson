import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Progress from './progress'

export default function Video({
  src,
  controls = true,
  loop = false,
  muted = true,
}) {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef(0)

  const { ref, inView, entry } = useInView({
    threshold: .5,
  })

  useEffect(() => inView ? setPlaying(true) : setPlaying(false), [inView])

  useEffect(() => playing ? videoRef.current.play() : videoRef.current.pause(), [playing])

  useEffect(() => {
    let interval = setInterval(() =>
      setCurrentTime(videoRef.current?.currentTime ?? 0)
    , 100)
    return () => clearInterval(interval)
  }, [currentTime])

  return (
    <div className={`video-container`} ref={ref}>
      <CustomControls
        state={[playing, setPlaying]}
        currentTime={currentTime}
        duration={videoRef.current ? videoRef.current.duration : 0}
        customControls={controls}>
        <video
          ref={videoRef}
          playsInline={true}
          muted={muted}
          loop={loop}
          controls={false}
          onEnded={() => setPlaying(false)}
          >
          <source src={src} type={"video/mp4"} />
        </video>
      </CustomControls>
    </div>
  )
}

const CustomControls = (props, ref) => {
  const { children, state, videoRef, customControls, currentTime, duration } = props
  const [playing, setPlaying] = state

  if (!customControls) return children

  return (
    <div
      className={`controls ${playing ? 'playing' : 'paused'}`}
      onClick={() => setPlaying(!playing)}
      >
      {children}
      <div className={'container'}>
        {
          playing
          ? <div
              className={"pause button"}>
              Press to pause
            </div>
          : <div
              className={"play button"}>
              Press to play
            </div>
        }
        <Progress
          currentTime={currentTime}
          duration={duration}
        />
      </div>
    </div>
  )
}
