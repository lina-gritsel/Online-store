import { renderPromoSummary } from './renderPromoSummary'
import { Products } from '../../../api'

export const renderSummary = (
  cardPrices: number[],
  cardNumOfUnits: number[],
) => {
  const cart: Products[] = JSON.parse(localStorage.getItem('cart') as string)

  const addPromoRS = document.getElementById('addPromoRS') as HTMLButtonElement
  const totalAmount = document.getElementById('amount') as HTMLParagraphElement
  const totalPrice = document.getElementById('total') as HTMLParagraphElement
  const promoCode = document.getElementById('promoCode') as HTMLInputElement
  const appliedEPM = document.getElementById('dropEPM') as HTMLDivElement
  const appliedRS = document.getElementById('dropRS') as HTMLDivElement
  const discountEPM = document.getElementById('EPM') as HTMLDivElement
  const discountRS = document.getElementById('RS') as HTMLDivElement
  const dropPromoEPM = document.getElementById(
    'dropPromoEPM',
  ) as HTMLButtonElement
  const addPromoEPM = document.getElementById(
    'addPromoEPM',
  ) as HTMLButtonElement
  const dropPromoRS = document.getElementById(
    'dropPromoRS',
  ) as HTMLButtonElement
  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement
  const headerSum = document.getElementById('cartSum') as HTMLParagraphElement
  const promoTotal = document.getElementById(
    'promoTotal',
  ) as HTMLParagraphElement

  let isUseRS = JSON.parse(localStorage.getItem('isRS') as string)
  let isUseEPM = JSON.parse(localStorage.getItem('isEPM') as string)

  cart.map(({ price, numberOfUnits }) => {
    cardPrices.push(price)
    cardNumOfUnits.push(numberOfUnits)

    const totalProductsPrice = cardPrices.reduce(
      (a, b, i) => a + b * cardNumOfUnits[i],
      0,
    )
    const amountOfProducts = cardNumOfUnits.reduce((a, b) => a + b, 0)

    totalPrice.innerHTML = `Total: ${totalProductsPrice}$`
    totalAmount.innerHTML = `Products: ${amountOfProducts}`
    headerCart.innerHTML = `${amountOfProducts}`
    headerSum.innerHTML = `Cart total: ${totalProductsPrice}$`

    localStorage.setItem('amountOfProducts', JSON.stringify(amountOfProducts))
    localStorage.setItem('priceOfProducts', JSON.stringify(totalProductsPrice))

    const totalPriceWithOnePromo = totalProductsPrice - totalProductsPrice * 0.1
    const totalPriceWithTwoPromo = totalProductsPrice - totalProductsPrice * 0.2

    if (!isUseEPM && isUseRS) {
      promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`
    }

    if (!isUseRS && isUseEPM) {
      promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`
    }

    if (isUseRS && isUseEPM) {
      promoTotal.innerHTML = `Total: ${totalPriceWithTwoPromo}$`
    }

    promoCode.addEventListener('keyup', () => {
      if (isUseRS && promoCode.value === 'RS') {
        addPromoRS.style.display = 'none'
      }

      if (isUseEPM && promoCode.value === 'EPM') {
        addPromoEPM.style.display = 'none'
      }

      if (!cart.length) {
        addPromoRS.style.display = 'none'
        addPromoEPM.style.display = 'none'
      }

      if (promoCode.value === 'RS') {
        discountRS.style.display = 'flex'

        addPromoRS.addEventListener('click', () => {
          isUseRS = true
          promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`
          discountRS.style.display = 'none'
          appliedRS.style.display = 'flex'
          renderPromoSummary.renderSummaryWithPromo()

          localStorage.setItem('isRS', JSON.stringify(isUseRS))

          if (isUseEPM) {
            promoTotal.innerHTML = `Total: ${totalPriceWithTwoPromo}$`
          }
        })
      } else {
        discountRS.style.display = 'none'
      }

      if (promoCode.value === 'EPM') {
        discountEPM.style.display = 'flex'

        addPromoEPM.addEventListener('click', () => {
          isUseEPM = true
          promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`
          discountEPM.style.display = 'none'
          appliedEPM.style.display = 'flex'
          renderPromoSummary.renderSummaryWithPromo()

          localStorage.setItem('isEPM', JSON.stringify(isUseEPM))

          if (isUseRS) {
            promoTotal.innerHTML = `Total: ${totalPriceWithTwoPromo}$`
          }
        })
      } else {
        discountEPM.style.display = 'none'
      }
    })

    dropPromoRS.addEventListener('click', () => {
      isUseRS = false
      appliedRS.style.display = 'none'
      promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`

      localStorage.setItem('isRS', JSON.stringify(isUseRS))

      if (!isUseEPM) {
        renderPromoSummary.renderSummaryWithoutPromo()
      }
    })

    dropPromoEPM.addEventListener('click', () => {
      isUseEPM = false
      appliedEPM.style.display = 'none'
      promoTotal.innerHTML = `Total: ${totalPriceWithOnePromo}$`

      localStorage.setItem('isEPM', JSON.stringify(isUseEPM))

      if (!isUseRS) {
        renderPromoSummary.renderSummaryWithoutPromo()
      }
    })
  })
}
