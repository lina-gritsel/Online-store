import { Products } from './../../../api/types'
import { clearAllValues } from './clearAllValues'
import { setCartStateToLocalStorage } from './setCartStateToLocalStorage'

export const addItem = (card: Element, cart: Products[]) => {
  const numberOfProducts = card.children[2].children[0]
  const cardId = card.children[3].textContent as string
  const cardPrice = card.children[1].children[2]

  const currentCard = cart.find(
    (product) => product.id.toString() === cardId,
  ) as Products

  const { numberOfUnits, stock } = currentCard

  if (numberOfUnits === stock) {
    return currentCard.numberOfUnits
  }

  currentCard.numberOfUnits += 1
  cardPrice.textContent = `${currentCard.price * currentCard.numberOfUnits}$`
  numberOfProducts.innerHTML = `${currentCard.numberOfUnits}`

  localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeItem = (
  card: Element,
  cards: Element[],
  products: Products[],
  cart: Products[],
) => {
  const numberOfProducts = card.children[2].children[0]
  const cardId = card.children[3].textContent as string
  const cardPrice = card.children[1].children[2]

  const currentCard = cart.find(
    (product) => product.id.toString() === cardId,
  ) as Products

  const productCard = cards.find(
    (card) => card.children[3].textContent === cardId,
  ) as HTMLDivElement

  if (currentCard.numberOfUnits === 1) {
    products.forEach((product) => {
      const isCurrentProduct = product.id.toString() === cardId

      if (isCurrentProduct) {
        product.isInCart = false
      }
    })

    cart.splice(cart.indexOf(currentCard), 1)
    productCard.style.display = 'none'

    if (!cart.length) {
      clearAllValues()
      localStorage.setItem('amountOfProducts', JSON.stringify(cart.length))
    }
  } else {
    currentCard.numberOfUnits -= 1
    cardPrice.textContent = `${currentCard.price * currentCard.numberOfUnits}$`
    numberOfProducts.innerHTML = `${currentCard.numberOfUnits}`
  }

  setCartStateToLocalStorage({ products, cart })
}

export const deleteItem = (
  card: Element,
  cards: Element[],
  products: Products[],
  cart: Products[],
) => {
  const cardId = card.children[3].textContent as string

  const currentCard = cart.find(
    (product) => product.id.toString() === cardId,
  ) as Products
  const productCard = cards.find(
    (card) => card.children[3].textContent === cardId,
  ) as HTMLDivElement

  products.forEach((product) => {
    const isCurrentProduct = product.id.toString() === cardId

    if (isCurrentProduct) {
      product.isInCart = false
    }
  })

  cart.splice(cart.indexOf(currentCard), 1)
  productCard.style.display = 'none'

  if (!cart.length) {
    clearAllValues()
    localStorage.setItem('amountOfProducts', JSON.stringify(cart.length))
  }

  setCartStateToLocalStorage({ products, cart })
}
