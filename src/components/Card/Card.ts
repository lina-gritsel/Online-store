import { Products } from '../../api'
import styles from './Card.module.scss'

export const Card = (card: Products): string => {
  const { id, image, title, description, price, category, brand } = card

  return `
        <div class=${styles.card} id='card' category='${category}' brand='${brand}' name='${title}' price='${price}'>
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

        </div>
        `
}

// <a class=${styles.card} href="#/products/${card.id}" category='${card.category}' brand='${card.brand}' name='${card.title}' price='${card.price}'>
// <img class=${styles.cardImage} src=${card.image[0]}/>
// <div class=${styles.cardTitle} id='cardTitle' >${card.title}</div>
// <div class=${styles.cardDesc}>${card.description}</div>
// <div class=${styles.cardPrice} id='cardPrice'>${card.price}$</div>
// <div class=${styles.hidden}>${card.category}</div>
// <div class=${styles.hidden}>${card.brand}</div>
// </a>