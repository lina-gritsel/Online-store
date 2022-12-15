// import { useSort } from './useSort'
import styles from './CatalogCardList.module.scss'
import { Card } from '../../../components/Card'
import { compareNumbers } from './../../../utils/index'
import { Products } from './../../../api'

type useSort = (args: { products: Products[] }) => void

enum SortField {
  NAME = 'name',
  PRICE = 'price',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const useSort: useSort = ({ products }) => {
  const sortValues = document.getElementById('sortValues')
  const sortWrapper = document.getElementById('sortWrapper')
  const btnsSort = document.querySelectorAll('.btnSort')
  const cardsContainer = document.getElementById('cardsContainer')
  const body = document.querySelector('body')
  const globalSortBtn = document.getElementById('globalSortBtn') as HTMLElement

  sortValues?.addEventListener('click', (e) => {
    sortWrapper?.classList.toggle(styles.showValues)
    e.stopPropagation()
  })

  body?.addEventListener('click', () => {
    if (sortWrapper?.classList.contains(styles.showValues)) {
      sortWrapper.classList.remove(styles.showValues)
    }
  })

  btnsSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedBtn = (e as any)?.target
      const sortField = (e as any)?.target.id
      const sortArray = sortProducts(sortField, products)
      globalSortBtn.innerHTML = ''
      globalSortBtn.innerHTML = `${selectedBtn.textContent}`

      // window.history.replaceState(
      //   {},
      //   document.title,
      //   `${window.location}/${sortField}`
      // )

      if (cardsContainer) {
        cardsContainer.innerHTML = ''
        cardsContainer.insertAdjacentHTML(
          'beforeend',
          `${sortArray.map((data) => `${Card(data)}`).join('')}`,
        )
      }
    })
  })

  const sortProducts = (sortField: any, products: Products[]) => {
    const [sortBy, sortOrder] = sortField.split('-')
    return products.sort((productA, productB): any => {
      if (sortBy === SortField.NAME) {
        if (sortOrder === SortOrder.ASC) {
          return productA.title.localeCompare(productB.title)
        }
        return productB.title.localeCompare(productA.title)
      }
      if (sortBy === SortField.PRICE) {
        return compareNumbers(
          productA.price,
          productB.price,
          sortOrder === SortOrder.DESC,
        )
      }
      return 0
    })
  }
}
