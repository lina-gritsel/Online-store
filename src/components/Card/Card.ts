import { Products } from '../../api'
import styles from './Card.module.scss'

export const Card = (card: Products): string => {
  const { id, image, title, description, price, category, brand, stock } = card

  return `
        <div class=${styles.card} id='card' category='${category}' brand='${brand}' name='${title}' price='${price}' stock='${stock}'>
            <div class=${styles.imgBlock} id='imgBlock'>
              <img class=${styles.cardImage} src=${image[0]}/>
              <img class=${styles.addCart} src='../../assets/svg/cart.svg' id='addToCart'/>
              <img class=${styles.deleteCart} src='../../assets/svg/delete.png' id='deleteFromCart'/>
            </div>           
            <a class=${styles.cardTitle} id='cardTitle' href="#/products/${id}">${title}</a>
            <div class=${styles.cardDesc}>${description}</div>
            <div class=${styles.cardPrice} id='cardPrice'>${price}$</div>
            <div class=${styles.hidden}>${category}</div>
            <div class=${styles.hidden}>${brand}</div>
            <div class=${styles.hidden}>${id}</div>
            <div class=${styles.brand}>Brand: ${card.brand}</div>
            <div class=${styles.brand}>Stock: ${card.stock}</div>
        </div>
        `
}