// import { notFoundMessage } from '../constants'

export const filteringCategories = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement

  let selectedCategory: string[] = []

  const products = [...cardsContainer.children]

  const addCategory = (category: string) => {
    selectedCategory.push(category)
  }

  const removeFromCategory = (category: string) => {
    selectedCategory = selectedCategory.filter((selectedCategory) => {
      return selectedCategory !== category
    })
  }

  const filterProductsByCategory = () => {
    return products.filter((product: Element) => {
      const currentCategory = product.getAttribute('category') as string

      return selectedCategory.includes(currentCategory)
    })
  }

  const hiddenAllProducts = () => {
    products.forEach((product) => {
      product.classList.add('hidden')
    })
  }

  const showAllProducts = () => {
    products.forEach((product) => {
      product.classList.remove('hidden')
    })
  }

  return {
    addCategory,
    removeFromCategory,
    filterProductsByCategory,
    hiddenAllProducts,
    showAllProducts
  }
}