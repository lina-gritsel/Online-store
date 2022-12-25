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
  const body = document.querySelector('body')
  const globalSortBtn = document.getElementById('globalSortBtn') as HTMLElement
  const sortImg = document.getElementById('sortImg') as HTMLImageElement
  const cards = document.getElementById('cardsContainer') as HTMLElement

  const sort = (sortField: string) => {
    const [sortBy, sortOrder] = sortField.split('-')
    const searchURL = new URL((window as any).location)
    searchURL.searchParams.set('sortBy', sortBy)
    searchURL.searchParams.set('sortOrder', sortOrder)
    window.history.pushState({}, '', searchURL)
    ;[...cards.children]
      .sort((a: Element, b: Element) => {
        const productA = a.getAttribute(sortBy) as string
        const productB = b.getAttribute(sortBy) as string

        if (sortBy === SortField.PRICE) {
          const priceA = parseFloat(productA)
          const priceB = parseFloat(productB)

          return compareNumbers(priceA, priceB, sortOrder === SortOrder.DESC)
        }

        if (sortBy === SortField.NAME) {
          if (sortOrder === SortOrder.ASC) {
            return productA.localeCompare(productB)
          }
          return productB.localeCompare(productA)
        }
        return 0
      })
      .forEach((node) => cards.append(node))
  }

  btnsSort.forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      const selectedBtn = e?.target as HTMLElement
      const sortField = selectedBtn.id
      sort(sortField)

      globalSortBtn.innerHTML = ''
      globalSortBtn.innerHTML = `${selectedBtn.textContent}`
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
}
