export const contentful = ({ src, quality, width }) => {
  const params = [
    `w=${width}`,
    `q=${quality ?? 75}`,
    `fm=jpg`,
    `fl=progressive`
  ]

  return `${src}?${params.join('&')}`
}
