export const cardNumberSeparation = (cardNumberValue: string) => {
  const separationNumberValue = cardNumberValue.split(' ').join('')
  const finalVal = separationNumberValue.match(/.{1,4}/g)?.join(' ')
  cardNumberValue = finalVal !== undefined ? finalVal : ''
  return cardNumberValue
}
