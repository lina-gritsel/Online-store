import { Products, getAllProducts } from '../../api'
import { clearAllValues } from '../../pages/CartPage/Cart/clearAllValues'
import { clearLocalStorage } from './clearLocalStorage'
import { setCartStateToLocalStorage } from '../../pages/CartPage/Cart/setCartStateToLocalStorage'

export const dropProductFromCart = async () => {
  const product: Products = JSON.parse(
    localStorage.getItem('product') as string,
  )
  const products: Products[] =
    JSON.parse(localStorage.getItem('products') as string) ||
    (await getAllProducts())
  let cart: Products[] =
    JSON.parse(localStorage.getItem('cart') as string) || []

  let cartLength =
    JSON.parse(localStorage.getItem('amountOfProducts') as string) ||
    cart.length
  let cartSum =
    JSON.parse(localStorage.getItem('priceOfProducts') as string) || 0

  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement
  const headerSum = document.getElementById('cartSum') as HTMLParagraphElement

  let currentCard = cart.find(
    (item) => item.id.toString() === product.id.toString(),
  ) as Products

  cartSum -= product.price * currentCard.numberOfUnits

  headerCart.innerHTML = `${(cartLength -= currentCard.numberOfUnits)}`
  headerSum.innerHTML = `Cart total: ${cartSum}$`

  localStorage.setItem('priceOfProducts', JSON.stringify(cartSum))
  localStorage.setItem(
    'amountOfProducts',
    JSON.stringify(parseInt(headerCart.textContent as string)),
  )

  products.forEach((item) => {
    const isCurrentCard = item.id.toString() === product.id.toString()
    if (isCurrentCard) {
      item.isInCart = false
    }
  })

  cart.splice(cart.indexOf(currentCard), 1)

  setCartStateToLocalStorage({ products, cart })

  if (!cart.length) {
    clearAllValues()
    clearLocalStorage()
  }
}
