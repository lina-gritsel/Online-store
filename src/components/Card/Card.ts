import { Products } from '../../api'
import style from './Card.module.scss'

export const Card = (card: Products): string => {
  return `
        <a class=${style.card} href="#/products/${card.id}">
            <img class=${style.cardImage} src=${card.image[0]}/>
            <div class=${style.cardTitle} id='cardTitle'>${card.title}</div>
            <div class=${style.cardDesc}>${card.description}</div>
            <div class=${style.cardPrice} id='cardPrice'>${card.price}$</div>
        </a>
        `
}
