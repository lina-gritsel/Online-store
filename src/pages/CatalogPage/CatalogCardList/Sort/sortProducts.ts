import { compareNumbers } from '../../../../utils'
import { SortField, SortOrder } from './models'

export const sort = (sortField: string) => {
  const cards = document.getElementById('cardsContainer') as HTMLElement

  const [sortBy, sortOrder] = sortField.split('-')
  localStorage.setItem('sortBy', sortBy)
  localStorage.setItem('sortOrder', sortOrder)
  const storageSortBy = localStorage.getItem('sortBy') as string
  const storagesortOrder = localStorage.getItem('sortOrder') as string

  const searchURL = new URL(window.location.href)
  searchURL.searchParams.set('sortBy', sortBy)
  searchURL.searchParams.set('sortOrder', sortOrder)
  window.history.pushState({}, '', searchURL)

  const sortProduct = () => {
  
    ;[...cards.children]
      .sort((a: Element, b: Element): number => {
        const productA =
          a.getAttribute(storageSortBy) || (a.getAttribute(sortBy) as string)
        const productB =
          b.getAttribute(storagesortOrder) || (b.getAttribute(sortBy) as string)

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
  sortProduct()
}
