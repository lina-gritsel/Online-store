import { Products } from '../../api'
import styles from './CartCard.module.scss'

export const CartCard = (card: Products): string => {
  const { id, image, title, description, price, numberOfUnits, stock } = card
  const cardPrice = price * numberOfUnits

  return `
        <div class=${styles.card} id='card'>
            <div class=${styles.imgBlock}>
              <div class=${styles.circle}>
                <p class=${styles.cardNum} id='cardNum'></p> 
              </div>
              <img class=${styles.cardImage} src=${image[0]}/>
            </div>           
            <div class=${styles.cardInfo}>
              <a class=${styles.cardTitle} id='cardTitle' href="#/products/${id}">${title}</a>
              <div class=${styles.cardDesc}>${description}</div>
              <div class=${styles.cardPrice} id='cardPrice'>${cardPrice}$</div>
              <button class=${styles.delete} id='deleteItem'>Delete</button>
            </div>
            <div class=${styles.amountBlock}>
              <p class=${styles.amount} id='numberOfUnits'>${numberOfUnits}</p>
              <div class=${styles.arrowBlock}>
                <img class=${styles.arrowAdd} id='addItem' src='../../assets/svg/add.svg'/>
                <img class=${styles.arrowRemove} id ='removeItem' src='../../assets/svg/remove.svg'/>
              </div>
            </div>
            <div class=${styles.hidden}>${id}</div>
            <p class=${styles.stock}>Max: ${stock}</p>
        </div>
        `
}
