import { Products } from '../../api'
import style from './Card.module.scss'

export const Card = (card: Products): string => {
  return `
      <a class='${style.link} cardLink' href=${`#product`} id=${card.id}>
        <div class=${style.card} id='card'>
          <img class=${style.cardImage} src=${card.image}/>
          <div class=${style.cardTitle} id='cardTitle'>${card.title}</div>
          <div class=${style.cardDesc}>${card.description}</div>
          <div class=${style.cardPrice} id='cardPrice'>${card.price}$</div>
        </div>
      </a>
        `
}