import styles from './Category.module.scss'
import relaxCategory from '../../../assets/images/relaxation.jpg'
import workCategory from '../../../assets/images/work.jpg'
import kitchenCategory from '../../../assets/images/kitchen.jpg'
import childrenCategory from '../../../assets/images/childrens.jpg'
import bathroomCategory from '../../../assets/images/bathroom.jpg'
import { Categories } from '../../../api/index'

const categories: Categories[] = [
  { title: 'отдыха', image: relaxCategory },
  { title: 'работы', image: workCategory },
  { title: 'кухни', image: kitchenCategory },
  { title: 'детской', image: childrenCategory },
  { title: 'ванной', image: bathroomCategory },
]

export const Category = (): string => {
  return `
      <div class=${styles.wrapper}>
        <h2 class=${styles.title}>Мебель для ...</h2>
        <div class=${styles.content}>
        ${categories
          .map(
            ({ title, image }) =>
              `<div class=${styles.card} style='background-image: url(${image})'>
            <p class=${styles.text}>${title}</p>
          </div>`,
          )
          .join('')}
        </div>
      </div>
    `
}
