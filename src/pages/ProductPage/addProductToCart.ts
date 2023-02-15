import { setCartStateToLocalStorage } from '../CartPage/Cart/setCartStateToLocalStorage'
import { getProduct } from '../../api/requests'
import { parseRequestURL } from '../../utils'
import { getAllProducts } from '../../api'
import { Products } from './../../api'

type addProductToCart = (args: { product: Products }) => void

export const addProductToCart: addProductToCart = async () => {
  const products: Products[] =
    JSON.parse(localStorage.getItem('products') as string) ||
    (await getAllProducts())
  let cart: Products[] =
    JSON.parse(localStorage.getItem('cart') as string) || []

  const btnAddToCart = document.getElementById('addToCart') as HTMLButtonElement
  const btnDropFromCart = document.getElementById(
    'dropFromCart',
  ) as HTMLButtonElement
  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement
  const headerSum = document.getElementById('cartSum') as HTMLParagraphElement

  let cartLength =
    JSON.parse(localStorage.getItem('amountOfProducts') as string) ||
    cart.length
  let cartSum =
    JSON.parse(localStorage.getItem('priceOfProducts') as string) || 0

  headerCart.innerHTML = `${cartLength}`
  headerSum.innerHTML = `Cart total: ${cartSum}$`

  const { id } = parseRequestURL(location.hash.slice(1).toLowerCase())
  const product = await getProduct(id)

  let currentCard = cart.find(
    (item) => item.id.toString() === product.id.toString(),
  ) as Products

  if (currentCard) {
    btnDropFromCart.style.display = 'block'
  } else {
    btnAddToCart.style.display = 'block'
  }

  btnAddToCart.addEventListener('click', () => {
    currentCard = cart.find(
      (item) => item.id.toString() === product.id.toString(),
    ) as Products

    cartSum += product.price

    headerCart.innerHTML = `${(cartLength += 1)}`
    headerSum.innerHTML = `Cart total: ${cartSum}$`

    localStorage.setItem('priceOfProducts', JSON.stringify(cartSum))
    localStorage.setItem(
      'amountOfProducts',
      JSON.stringify(parseInt(headerCart.textContent as string)),
    )

    btnAddToCart.style.display = 'none'
    btnDropFromCart.style.display = 'block'

    products.forEach((item) => {
      const isCurrentCard = item.id.toString() === product.id.toString()
      if (isCurrentCard) {
        item.isInCart = true
      }
    })

    cart.push({ ...product, numberOfUnits: 1 })

    setCartStateToLocalStorage({ products, cart })
  })

  btnDropFromCart.addEventListener('click', () => {
    currentCard = cart.find(
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

    btnAddToCart.style.display = 'block'
    btnDropFromCart.style.display = 'none'

    products.forEach((item) => {
      const isCurrentCard = item.id.toString() === product.id.toString()
      if (isCurrentCard) {
        item.isInCart = false
      }
    })

    cart.splice(cart.indexOf(currentCard), 1)

    setCartStateToLocalStorage({ products, cart })
  })
}
