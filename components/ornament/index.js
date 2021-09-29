export const HR = () => {
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
