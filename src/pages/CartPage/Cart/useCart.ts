import { clearLocalStorage } from '../../../components/CreateOrderModal/clearLocalStorage'
import { renderPromoSummary } from './renderPromoSummary'
import { clearAllValues } from './clearAllValues'
import { renderSummary } from './renderSummary'
import { Products } from './../../../api/types'
import { removeItem } from './cartState'
import { deleteItem } from './cartState'
import { addItem } from './cartState'

type useCart = () => void

export const useCart: useCart = () => {
  const products: Products[] = JSON.parse(
    localStorage.getItem('products') as string,
  )
  const cart: Products[] = JSON.parse(localStorage.getItem('cart') as string)
  const cards = [...document.querySelectorAll('#card')]

  const totalAmount = document.getElementById('amount') as HTMLParagraphElement
  const headerSum = document.getElementById('cartSum') as HTMLParagraphElement
  const totalPrice = document.getElementById('total') as HTMLParagraphElement
  const nextPage = document.getElementById('nextPage') as HTMLButtonElement
  const prevPage = document.getElementById('prevPage') as HTMLButtonElement
  const btnBuyNow = document.getElementById('buyNow') as HTMLButtonElement
  const appliedEPM = document.getElementById('dropEPM') as HTMLDivElement
  const clearBtn = document.getElementById('clear') as HTMLButtonElement
  const appliedRS = document.getElementById('dropRS') as HTMLDivElement
  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement
  const cartContainer = document.getElementById(
    'cartContainer',
  ) as HTMLDivElement

  let isUseRS: boolean =
    JSON.parse(localStorage.getItem('isRS') as string) || false
  let isUseEPM: boolean =
    JSON.parse(localStorage.getItem('isEPM') as string) || false

  clearBtn.addEventListener('click', () => {
    clearLocalStorage()
    clearAllValues()
  })

  if (isUseRS) {
    appliedRS.style.display = 'flex'
    renderPromoSummary.renderSummaryWithPromo()
  }

  if (isUseEPM) {
    appliedEPM.style.display = 'flex'
    renderPromoSummary.renderSummaryWithPromo()
  }

  if (!cart || !cart.length) {
    headerCart.innerHTML = '0'
    headerSum.innerHTML = 'Cart total: 0$'
    cartContainer.innerHTML = 'Cart is empty'
    totalAmount.innerHTML = 'Products: 0'
    totalPrice.innerHTML = 'Total: 0$'
    btnBuyNow.disabled = true
    nextPage.disabled = true
    prevPage.disabled = true

    renderPromoSummary.renderSummaryWithoutPromo()
  } else {
    let cardPrices: number[] = []
    let cardNumOfUnits: number[] = []

    renderSummary(cardPrices, cardNumOfUnits)

    cards.forEach((card) => {
      const cardNum = card.children[0].children[0].children[0]
      const numberOfProducts = card.children[2].children[0]
      const cardId = card.children[3].textContent as string
      const cardPrice = card.children[1].children[2]
      const removeItemBtn = card.children[2].children[1].children[1]
      const addItemBtn = card.children[2].children[1].children[0]
      const deleteItemBtn = card.children[1].children[3]

      const currentCard = cart.find(
        (product) => product.id.toString() === cardId,
      ) as Products

      cardNum.innerHTML = `${cart.indexOf(currentCard) + 1}`

      addItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        addItem(numberOfProducts, cart, currentCard, cardPrice)
        renderSummary(cardPrices, cardNumOfUnits)
      })

      removeItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        removeItem(
          products,
          cart,
          numberOfProducts,
          currentCard,
          cardPrice,
          cardId,
        )
        renderSummary(cardPrices, cardNumOfUnits)
      })

      deleteItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        deleteItem(products, cart, cardId, currentCard)
        renderSummary(cardPrices, cardNumOfUnits)
      })
    })
  }
}
