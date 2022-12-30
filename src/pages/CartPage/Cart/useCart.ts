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
      const numberOfProducts = card.children[2].children[0]
      const cardId = card.children[3].textContent as string
      const cardPrice = card.children[1].children[2]
      const removeItemBtn = card.children[2].children[1].children[1]
      const addItemBtn = card.children[2].children[1].children[0]
      const deleteItemBtn = card.children[1].children[3]

      const currentCard = cart.find(
        (product) => product.id.toString() === cardId,
      ) as Products

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
