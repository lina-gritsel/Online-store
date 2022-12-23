import masterCard from '../../../assets/svg/masterCard.svg'
import discover from '../../../assets/svg/discover.svg'
import express from '../../../assets/svg/american.svg'
import visa from '../../../assets/svg/visa.svg'
import { PaymentCards } from '../models'

const getCardImageByNumber = (number: string): string => {
  if (number === PaymentCards.DISCOVER) return discover
  if (number === PaymentCards.MASTERCARD) return masterCard
  if (number === PaymentCards.VISA) return visa
  if (number === PaymentCards.EXPRESS) return express
  return ''
}

export const setCardImage = (firstValueNumber: string) => {
  const cardLogo = document.getElementById('cardLogo') as HTMLImageElement

  const imageSrc = getCardImageByNumber(firstValueNumber)
  cardLogo.src = imageSrc
}
