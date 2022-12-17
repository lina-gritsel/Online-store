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
  const sortImg = document.getElementById('sortImg') as HTMLImageElement

  const sortProducts = (sortField: string, products: Products[]) => {
    const [sortBy, sortOrder] = sortField.split('-')

    const searchURL = new URL((window as any).location)
    searchURL.searchParams.set('sortBy', sortBy)
    searchURL.searchParams.set('sortOrder', sortOrder)
    window.history.pushState({}, '', searchURL)

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

  btnsSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedBtn = (e as any)?.target
      const sortField = (e as any)?.target.id
      const sortArray = sortProducts(sortField, products)
      globalSortBtn.innerHTML = ''
      globalSortBtn.innerHTML = `${selectedBtn.textContent}`
      //   setLocalStorage(`${sortField}`)

      if (cardsContainer) {
        cardsContainer.innerHTML = ''
        cardsContainer.insertAdjacentHTML(
          'beforeend',
          `${sortArray.map((data) => `${Card(data)}`).join('')}`,
        )
      }
    })
  })

  sortValues?.addEventListener('click', (e: MouseEvent) => {
    sortWrapper?.classList.toggle(styles.showValues)
    sortImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })

  body?.addEventListener('click', () => {
    if (
      sortWrapper?.classList.contains(styles.showValues) &&
      sortImg?.classList.contains(styles.imgRotate)
    ) {
      sortWrapper.classList.remove(styles.showValues)
      sortImg.classList.remove(styles.imgRotate)
    }
  })

  //   const setLocalStorage = (value: string): void => {
  //     localStorage.setItem('sort', value)
  //   }

  //   const getLocalStorage = () =>{
  //     if(localStorage.getItem('sort')){
  //         return localStorage.getItem('sort')
  //     }
  //   }
  //   window.addEventListener('load', getLocalStorage)
}
