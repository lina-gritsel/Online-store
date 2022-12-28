import { setCartStateToLocalStorage } from './setCartStateToLocalStorage'
import { renderPromoSummary } from './renderPromoSummary'
import { clearAllValues } from './clearAllValues'
import { renderSummary } from './renderSummary'
import { Products } from './../../../api/types'
import { addItem } from './cartState'
import { removeItem } from './cartState'
import { deleteItem } from './cartState'

type useCart = () => void

export const useCart: useCart = () => {
  const products: Products[] = JSON.parse(
    localStorage.getItem('products') as string,
  )
  const cart: Products[] = JSON.parse(localStorage.getItem('cart') as string)
  const cards = [...document.querySelectorAll('#card')]

  const appliedEPM = document.getElementById('dropEPM') as HTMLDivElement
  const clearBtn = document.getElementById('clear') as HTMLButtonElement
  const appliedRS = document.getElementById('dropRS') as HTMLDivElement
  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement

  let isUseRS: boolean =
    JSON.parse(localStorage.getItem('isRS') as string) || false
  let isUseEPM: boolean =
    JSON.parse(localStorage.getItem('isEPM') as string) || false

  headerCart.innerHTML = `${cart.length}`

  clearBtn.addEventListener('click', () => {
    localStorage.clear()
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
    clearAllValues()
  } else {
    let cardPrices: number[] = []
    let cardNumOfUnits: number[] = []

    renderSummary(cardPrices, cardNumOfUnits)

    cards.forEach((card) => {
      const removeItemBtn = card.children[2].children[1].children[1]
      const addItemBtn = card.children[2].children[1].children[0]
      const deleteItemBtn = card.children[1].children[3]

      addItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        addItem(card, cart)
        renderSummary(cardPrices, cardNumOfUnits)
      })

      removeItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        removeItem(card, cards, products, cart)
        renderSummary(cardPrices, cardNumOfUnits)
      })

      deleteItemBtn.addEventListener('click', () => {
        cardPrices = []
        cardNumOfUnits = []

        deleteItem(card, cards, products, cart)
        renderSummary(cardPrices, cardNumOfUnits)
      })
    })
  }
}
