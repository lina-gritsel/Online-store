export const filterCategories = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement


  const storageSelectedCategory =
    JSON.parse(localStorage.getItem('selectedCategory') as string) || []
  let selectedCategory: string[] = storageSelectedCategory || []

  const products = [...cardsContainer.children]

  const addCategory = (category: string) => {
    selectedCategory.push(category)
    localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory))
  }

  const removeFromCategory = (category: string) => {
    selectedCategory = selectedCategory.filter((selectedCategory) => {
      return selectedCategory !== category
    })
    localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory))
  }

  resetBtn.addEventListener('click', () =>{
    selectedCategory = []
  })


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
    showAllProducts,
  }
}
