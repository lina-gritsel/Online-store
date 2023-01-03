import { Products } from './../../../api/types'
import { clearAllValues } from './clearAllValues'
import { setCartStateToLocalStorage } from './setCartStateToLocalStorage'

export const addItem = (
  numberOfProducts: Element,
  cart: Products[],
  currentCard: Products,
  cardPrice: Element,
) => {
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
  products: Products[],
  cart: Products[],
  numberOfProducts: Element,
  currentCard: Products,
  cardPrice: Element,
  cardId: string,
) => {
  if (currentCard.numberOfUnits === 1) {
    products.forEach((product) => {
      const isCurrentProduct = product.id.toString() === cardId

      if (isCurrentProduct) {
        product.isInCart = false
      }
    })

    cart.splice(cart.indexOf(currentCard), 1)
    window.location.reload();

    if (!cart.length) {
      clearAllValues()
      localStorage.setItem('amountOfProducts', JSON.stringify(cart.length))
      localStorage.setItem('priceOfProducts', JSON.stringify(0))
    }
  } else {
    currentCard.numberOfUnits -= 1
    cardPrice.textContent = `${currentCard.price * currentCard.numberOfUnits}$`
    numberOfProducts.innerHTML = `${currentCard.numberOfUnits}`
  }

  setCartStateToLocalStorage({ products, cart })
}

export const deleteItem = (
  products: Products[],
  cart: Products[],
  cardId: string,
  currentCard: Products,
) => {
  products.forEach((product) => {
    const isCurrentProduct = product.id.toString() === cardId

    if (isCurrentProduct) {
      product.isInCart = false
    }
  })

  cart.splice(cart.indexOf(currentCard), 1)
  window.location.reload();

  if (!cart.length) {
    clearAllValues()
    localStorage.setItem('amountOfProducts', JSON.stringify(cart.length))
    localStorage.setItem('priceOfProducts', JSON.stringify(0))
  }

  setCartStateToLocalStorage({ products, cart })
}
