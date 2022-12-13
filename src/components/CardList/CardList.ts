import { getAllProducts, Products } from '../../api'
import { Card } from '../Card'
import styles from './CardList.module.scss'

export const CardList = async (): Promise<string> => {
  const data = await getAllProducts()
  const newData = data.splice(0, 6)

  return `<div class=${styles.container}>
            <div class=${styles.title}>Каталог товаров</div>
            <div class=${styles.content}>
            ${newData.map((data) => `${Card(data)}`).join('')}
            </div>
            <a href='#catalog' class=${styles.link}>Перейти в каталог</a>
         </div>`
}
