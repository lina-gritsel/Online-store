import { getAllProducts } from '../../api'
import { Card } from '../Card'
import styles from './CardList.module.scss'

export const CardList = {
  render: async () => {
    const data = await getAllProducts()
    const newData = data.splice(0, 6)

    return `<div class=${styles.container}>
              <div class=${styles.title}>Сatalog</div>
              <div class=${styles.content}>
              ${newData.map((data) => `${Card(data)}`).join('')}
              </div>
              <a href='#/catalog' class=${styles.link}>Go to catalog</a>
            </div>`
  },

  afterRender: async () => {
  },
}
