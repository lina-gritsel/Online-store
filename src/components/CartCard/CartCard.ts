import { Products } from '../../api'
import styles from './CartCard.module.scss'

export const CartCard = (card: Products): string => {
  const { id, image, title, description, price, numberOfUnits } = card

  return `
        <div class=${styles.card} id='card'>
            <div class=${styles.imgBlock}>
              <img class=${styles.cardImage} src=${image[0]}/>
            </div>           
            <div class=${styles.cardInfo}>
              <div class=${styles.cardTitle} id='cardTitle'>${title}</div>
              <div class=${styles.cardDesc}>${description}</div>
              <div class=${styles.cardPrice} id='cardPrice'>${price}$</div>
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
        </div>
        `
}
