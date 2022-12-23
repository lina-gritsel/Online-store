import { Products } from './../../../api'
import { getAllProducts } from '../../../api'
import styles from '../../../components/Card/Card.module.scss'

type addToCart = (args: { products: Products[] }) => void

export const addToCart: addToCart = async () => {
  const cards = [...document.querySelectorAll('#card')]
  const products =
    JSON.parse(localStorage.getItem('products') as string) ||
    (await getAllProducts())
  let cart: any[] = JSON.parse(localStorage.getItem('cart') as string) || []

  cards.forEach((card) => {
    const btnAdd = card.children[0].children[1] as HTMLButtonElement
    const btnDelete = card.children[0].children[2] as HTMLButtonElement
    const cardId = card.children[6].textContent as string
    const imgBlock = card.children[0] as HTMLDivElement

    products.forEach((product: any) => {
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

      if (cart.some((item) => item.id.toString() === cardId)) {
      } else {
        const item = products.find(
          (product: any) => product.id.toString() === cardId,
        )

        products.forEach((product: any) => {
          if (product.id.toString() === cardId) {
            product.isInCart = true
          }
        })

        cart.push({ ...item, numberOfUnits: 1 })

        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    })

    btnDelete.addEventListener('click', () => {
      btnAdd.style.display = ''
      btnDelete.style.display = 'none'
      imgBlock.classList.remove(styles.covered)

      if (cart.some((item) => item.id.toString() === cardId)) {
        products.forEach((product: any) => {
          if (product.id.toString() === cardId) {
            product.isInCart = false

            const item = cart.find(
              (product: any) => product.id.toString() === cardId,
            )

            cart.splice(cart.indexOf(item), 1)
          }
        })

        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    })
  })
}
