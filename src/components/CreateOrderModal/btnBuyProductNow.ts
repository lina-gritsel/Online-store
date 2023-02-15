import { Products, getAllProducts } from '../../api'
import { setCartStateToLocalStorage } from '../../pages/CartPage/Cart/setCartStateToLocalStorage'

export const btnBuyProductNow = async () => {
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

  const buyNow = document.getElementById('buyNow')
  const btnAddToCart = document.getElementById('addToCart') as HTMLButtonElement
  const btnDropFromCart = document.getElementById(
    'dropFromCart',
  ) as HTMLButtonElement
  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement
  const headerSum = document.getElementById('cartSum') as HTMLParagraphElement

  let isOrderingForOneProduct = false
  let currentCard = cart.find(
    (item) => item.id.toString() === product.id.toString(),
  ) as Products

  buyNow?.addEventListener('click', () => {
    cart = JSON.parse(localStorage.getItem('cart') as string) || []
    currentCard = cart.find(
      (item) => item.id.toString() === product.id.toString(),
    ) as Products

    if (!currentCard) {
      isOrderingForOneProduct = true

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

      localStorage.setItem(
        'isOrdering',
        JSON.stringify(isOrderingForOneProduct),
      )
      window.location.hash = '#/cart'
    } else {
      isOrderingForOneProduct = true
      localStorage.setItem(
        'isOrdering',
        JSON.stringify(isOrderingForOneProduct),
      )
      window.location.hash = '#/cart'
    }
  })
}
