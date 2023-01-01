import { compareNumbers } from "../../../../utils"
import { SortField, SortOrder } from "./models"

export const sort = (sortField: string) => {
  const cards = document.getElementById('cardsContainer') as HTMLElement

  const [sortBy, sortOrder] = sortField.split('-')

  const searchURL = new URL((window as any).location)
  searchURL.searchParams.set('sortBy', sortBy)
  searchURL.searchParams.set('sortOrder', sortOrder)
  window.history.pushState({}, '', searchURL)
  
  ;[...cards.children]
    .sort((a: Element, b: Element): number => {
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
