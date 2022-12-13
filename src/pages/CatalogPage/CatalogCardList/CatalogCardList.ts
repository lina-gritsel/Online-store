import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'
import styles from './CatalogCardList.module.scss'

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()
    const newData = data.splice(0, 12)
    return `
    <div class=${styles.container}>
      <div class=${styles.wrapper}>
        <p class=${styles.path}>Главная / Каталог товаров</p>
        <button class=${styles.sortValues} id='sortValues'>Sort</button>
        <div class=${styles.sortWrapper} id='sortWrapper'>
          <button class=${
            styles.sortBtn
          } id="name-asc">Sort by Name (asc)</button>
          <button class=${
            styles.sortBtn
          } id="name-desc">Sort by Name (desc)</button>
          <button class=${
            styles.sortBtn
          } id="price-asc">Sort by Price (asc)</button>
          <button class=${
            styles.sortBtn
          } id="price-desc">Sort by Price (desc)</button>
        </div>
      </div>
      <div class=${styles.content}>
      ${newData.map((data) => `${Card(data)}`).join('')}
      </div>
      <p class=${styles.link}>Показать ещё</p>
    </div>
    `
  },
  afterRender: async () => {
    const sortValues = document.getElementById('sortValues')
    const sortWrapper = document.getElementById('sortWrapper')

    sortValues?.addEventListener('click', () => {
      sortWrapper?.classList.toggle(styles.showValues)
    })
  },
}
