import { useInView } from 'react-intersection-observer';
const MAX_WIDTH = 2280

export const Img = ({ src, alt = "", width, height, lazy = false, className }) => {
  const mediaSizes = [320, 640, 1024, 1280, 1440, 2280]
  const aspectRatios = ["1x", "2x", "3x"]
  const sources = mediaSizes.map(size => (
    {
      width: size,
      height: (height / width) * size,
    }
  ))

  const { ref, inView, entry } = useInView({
    threshold: 0,
  })

  return (
      <div className="image-container">
        <picture>
          {
            sources.map((source, i) => (
            <source
              key={i}
              media={`(max-width: ${source.width / 2}px)`}
              srcSet={`${src}?fm=jpg&fl=progressive&w=${source.width}&h=${Math.floor(source.height)}`}
            />
          ))}
          <img
            className={`${className} ${inView ? "o-1" : "o-0"}`}
            src={`${src}?fm=jpg&fl=progressive`}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            width={width < MAX_WIDTH ? width : MAX_WIDTH}
            height={width < MAX_WIDTH ? height : Math.floor((height / width) * MAX_WIDTH)}
            ref={ref}
            style={{ visibility: (inView ? "visible" : "hidden")}}
            />
        </picture>
      </div>
  )
}
