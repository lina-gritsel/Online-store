import { CartCard } from '../../../components/CartCard'
import { Products } from './../../../api/types'
import styles from './Cart.module.scss'
import { useCart } from './useCart'

export const Cart = {
  render: async () => {
    const cart: Products[] =
      JSON.parse(localStorage.getItem('cart') as string) || []

    return `
   <div class=${styles.wrapper}>
     <div class=${styles.cart}>
       <div class=${styles.titleBlock}>
         <p class=${styles.title}>Product</p>
         <p class=${styles.title}>Amount</p>
       </div>
       <div class=${styles.line}></div>
       <div class=${styles.cardsContainer} id='cartContainer'>
    ${cart.map((data) => `${CartCard(data)}`).join('')}
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
         <p class=${styles.promoTotal} id='promoTotal'></p>
         <div class=${styles.appliedCodes} id='codes'>
         <p class=${styles.codesTitle}>Applied codes</p>
         <div class=${styles.dropLine}></div>
           <div class=${styles.discountBlockRS} id='dropRS'>
             <p class=${styles.subtitle} >Rolling Scopes School - 10%</p>
             <button class=${styles.addPromo} id='dropPromoRS'>Drop</button>
           </div>
           <div class=${styles.discountBlockEPM} id='dropEPM'>
             <p class=${styles.subtitle}>EPAM Systems - 10%</p>
             <button class=${styles.addPromo} id='dropPromoEPM'>Drop</button>
           </div>
          </div>
         <div class=${styles.promoBlock}>
           <input type="text" id='promoCode' class=${
             styles.promoCode
           } placeholder='Enter promo code'>
         <div class=${styles.discountBlockRS} id='RS'>
           <p class=${styles.subtitle} >Rolling Scopes School - 10%</p>
           <button class=${styles.addPromo} id='addPromoRS'>Add</button>
         </div>
         <div class=${styles.discountBlockEPM} id='EPM'>
           <p class=${styles.subtitle}>EPAM Systems - 10%</p>
           <button class=${styles.addPromo} id='addPromoEPM'>Add</button>
         </div>
         <p class=${styles.test}>Promo for test: 'RS', 'EPM'</p>
       </div>
       <button class=${styles.buy} id='buy'>Buy now</button>
      </div>
     </div>
   </div>
   `
  },
  afterRender: async () => {
    useCart()
  },
}
