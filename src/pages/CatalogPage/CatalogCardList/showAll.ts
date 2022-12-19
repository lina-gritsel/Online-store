import styles from './CatalogCardList.module.scss'
import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'

export const showAll = async () => {
    const products = await getAllProducts()
    const cardsContainer = document.getElementById(
      'cardsContainer',
    ) as HTMLDivElement
    const btnLoadMore = document.getElementById(
      'loadMore',
    ) as HTMLParagraphElement

    btnLoadMore.addEventListener('click', () => {
      cardsContainer.innerHTML = ''
      cardsContainer.insertAdjacentHTML(
        'beforeend',
        `${products.map((data) => `${Card(data)}`).join('')}`,
      )
      
      btnLoadMore.classList.add(styles.hidden)
    })
}
