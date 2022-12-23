import styles from './Cart.module.scss'
import { CartCard } from '../../../components/CartCard'

export const Cart = {
  render: async () => {
    const cart = JSON.parse(localStorage.getItem('cart') as string) || []

    return `
   <div class=${styles.wrapper}>
     <div class=${styles.cart}>
       <div class=${styles.titleBlock}>
         <p class=${styles.title}>Product</p>
         <p class=${styles.title}>Amount</p>
       </div>
       <div class=${styles.line}></div>
       <div class=${styles.cardsContainer} id='cartContainer'>
    ${cart.map((data: any) => `${CartCard(data)}`).join('')}
       </div>
       <div class=${styles.btnsBlock}>
         <button class=${styles.deleteAll} id='clear'>Clear cart</button>
         <div class=${styles.linkBlock}>
           <a href='#/catalog' class=${styles.link}>Continue shopping</a>
         </div>
       </div>
     </div>
     <div class=${styles.summary}>
     <p class=${styles.sumTitle}>Summary</p>
     <div class=${styles.line}></div>
     <div class=${styles.sumBlock}>
       <p class=${styles.subtitle} id='amount'></p>
       <p class=${styles.subtitle} id='total'></p>
       <button class=${styles.buy} id='clear'>Buy now</button>
     </div>
     </div>
   </div>
   `
  },
  afterRender: async () => {
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    const clearBtn = document.getElementById('clear') as HTMLButtonElement
    const cartContainer = document.getElementById(
      'cartContainer',
    ) as HTMLDivElement
    const totalPrice = document.getElementById('total') as HTMLParagraphElement
    const totalAmount = document.getElementById(
      'amount',
    ) as HTMLParagraphElement
    const addItemBtns = document.querySelectorAll('#addItem')
    const removeItemBtns = document.querySelectorAll('#removeItem')
    const deleteItemBtns = document.querySelectorAll('#deleteItem')
    const numberOfProducts = document.querySelectorAll('#numberOfUnits')

    clearBtn.addEventListener('click', () => {
      localStorage.clear()
      cartContainer.innerHTML = 'Cart is empty'
      totalPrice.innerHTML = 'Total: 0$'
      totalAmount.innerHTML = 'Products: 0'
    })

    if (!cart) {
      cartContainer.innerHTML = 'Cart is empty'
      totalPrice.innerHTML = 'Total: 0$'
      totalAmount.innerHTML = 'Products: 0'
    } else {
      let sumArr: number[] = []
      let lengthArr: number[] = []

      cart.forEach((item: any) => {
        sumArr.push(item.price)
        lengthArr.push(item.numberOfUnits)
        const total = sumArr.reduce((a, b) => (a * item.numberOfUnits) + (b * item.numberOfUnits), 0)
        const totalLength = lengthArr.reduce((a, b) => a + b, 0)
        totalPrice.innerHTML = `Total: ${total}$`
        totalAmount.innerHTML = `Products: ${totalLength}`
      })

      addItemBtns.forEach((btn) => {
        btn.addEventListener('click', (e: any) => {
          console.log(e.target.parentNode.parentNode.parentNode)

          cart.forEach((item: any) => {
            item.numberOfUnits += 1
            numberOfProducts.forEach((card) => {
              card.innerHTML = item.numberOfUnits
            })
          })
        })
      })
    }
  },
}
