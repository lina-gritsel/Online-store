import { Products } from '../../api'
import styles from './CartCard.module.scss'

export const CartCard = (card: Products): string => {
  const { image, title, description, price, numberOfUnits } = card

  return `
        <div class=${styles.card}>
            <div class=${styles.imgBlock}>
              <img class=${styles.cardImage} src=${image[0]}/>
            </div>           
            <div class=${styles.cardInfo}>
              <div class=${styles.cardTitle} id='cardTitle'>${title}</div>
              <div class=${styles.cardDesc}>${description}</div>
              <div class=${styles.cardPrice} id='cardPrice'>${price}$</div>
              <button class=${styles.delete}>Delete</button>
            </div>
            <div class=${styles.amountBlock}>
            <p class=${styles.amount}>${numberOfUnits}</p>
            <div class=${styles.arrowBlock}>
              <img class=${styles.arrowAdd} src='../../assets/svg/add.svg'/>
              <img class=${styles.arrowRemove} src='../../assets/svg/remove.svg'/>
            </div>
            </div>
        </div>
        `
}
