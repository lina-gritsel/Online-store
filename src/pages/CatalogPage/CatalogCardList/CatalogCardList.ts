import { getAllProducts} from '../../../api'
import { Card } from '../../../components/Card'
import styles from './CatalogCardList.module.scss'

export const CatalogCardList = async (): Promise<string> => {
  const data = await getAllProducts()
  const newData = data.splice(0, 12)

  return `
    <div class=${styles.container}>
      <p class=${styles.path}>Главная / Каталог товаров</p>
      <div class=${styles.content}>
      ${newData.map((data)=> `${Card(data)}`).join('')}
      </div>
      <p class=${styles.link}>Показать ещё</p>
    </div>
    `
}
