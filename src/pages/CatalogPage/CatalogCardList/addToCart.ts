import { Products } from './../../../api'
import { getAllProducts } from '../../../api'
import { setCartStateToLocalStorage } from '../../CartPage/Cart/setCartStateToLocalStorage'
import styles from '../../../components/Card/Card.module.scss'

type addToCart = (args: { products: Products[] }) => void

export const addToCart: addToCart = async () => {
  const cards: Element[] = [...document.querySelectorAll('#card')]
  const products: Products[] =
    JSON.parse(localStorage.getItem('products') as string) ||
    (await getAllProducts())
  let cart: Products[] =
    JSON.parse(localStorage.getItem('cart') as string) || []

  const headerCart = document.getElementById(
    'cartLength',
  ) as HTMLParagraphElement

  let cartLength =
    JSON.parse(localStorage.getItem('amountOfProducts') as string) ||
    cart.length

  headerCart.innerHTML = `${cartLength}`

  cards.forEach((card) => {
    const btnAdd = card.children[0].children[1] as HTMLButtonElement
    const btnDelete = card.children[0].children[2] as HTMLButtonElement
    const cardId = card.children[6].textContent as string
    const imgBlock = card.children[0] as HTMLDivElement

    products.forEach((product) => {
      if (product.isInCart) {
        if (product.id.toString() === cardId) {
          btnAdd.style.display = 'none'
          btnDelete.style.display = 'block'
          imgBlock.classList.add(styles.covered)
        }
      }
    })

    btnAdd.addEventListener('click', () => {
      btnAdd.style.display = 'none'
      btnDelete.style.display = 'block'
      imgBlock.classList.add(styles.covered)
      headerCart.innerHTML = `${(cartLength += 1)}`

      localStorage.setItem(
        'amountOfProducts',
        JSON.stringify(parseInt(headerCart.textContent as string)),
      )

      if (cart.some((item) => item.id.toString() === cardId)) {
      } else {
        const item = products.find(
          (product) => product.id.toString() === cardId,
        ) as Products

        products.forEach((product) => {
          if (product.id.toString() === cardId) {
            product.isInCart = true
          }
        })

        cart.push({ ...item, numberOfUnits: 1 })

        setCartStateToLocalStorage({ products, cart })
      }
    })

    btnDelete.addEventListener('click', () => {
      btnAdd.style.display = ''
      btnDelete.style.display = 'none'
      imgBlock.classList.remove(styles.covered)
      headerCart.innerHTML = `${(cartLength -= 1)}`

      localStorage.setItem(
        'amountOfProducts',
        JSON.stringify(parseInt(headerCart.textContent as string)),
      )

      if (cart.some((item) => item.id.toString() === cardId)) {
        products.forEach((product) => {
          if (product.id.toString() === cardId) {
            product.isInCart = false

            const item = cart.find(
              (product) => product.id.toString() === cardId,
            ) as Products

            cart.splice(cart.indexOf(item), 1)
          }
        })

        setCartStateToLocalStorage({ products, cart })
      }
    })
  })
}
