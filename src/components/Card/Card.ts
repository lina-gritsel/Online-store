import { Products } from '../../api'
import styles from './Card.module.scss'

export const Card = (card: Products): string => {
  return `
        <a class='${styles.card}' href="#/products/${card.id}" category='${card.category}' brand='${card.brand}' name=${card.title} price='${card.price}'>
            <img class=${styles.cardImage} src=${card.image[0]}/>
            <div class=${styles.cardTitle} id='cardTitle' >${card.title}</div>
            <div class=${styles.brand}>Brand: ${card.brand}</div>
            <div class=${styles.cardDesc}>${card.description}</div>
            <div class=${styles.cardPrice} id='cardPrice'>${card.price}$</div>
            <div class=${styles.hidden}>${card.category}</div>
        </a>
        `
}
