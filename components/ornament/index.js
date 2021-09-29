export const HR = ({ className, style }) => {
  const dashes = []
  for (let i = 0; i < 200; i++) dashes.push('—')

  return (
    <div
      style={style}
      className={`hr ${className}`}>
      {
        dashes.map((dash, i) => <span>{dash}</span>)
      }
    </div>
  )
}
