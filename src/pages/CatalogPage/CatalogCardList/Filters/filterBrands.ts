export const filterBrands = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement


  const storageSelectedBrands =
    JSON.parse(localStorage.getItem('selectedBrands') as string) || []
  let selectedBrands: string[] = storageSelectedBrands || []

  const products = [...cardsContainer.children]

  const addBrand = (brand: string) => {
    selectedBrands.push(brand)
    localStorage.setItem('selectedBrands', JSON.stringify(selectedBrands))
  }

  const removeFromBrands = (brand: string) => {
    selectedBrands = selectedBrands.filter((selectedBrand) => {
      return selectedBrand !== brand
    })
    localStorage.setItem('selectedBrands', JSON.stringify(selectedBrands))
  }

  resetBtn.addEventListener('click', () =>{
    selectedBrands = []
  })

  const filterProductsByBrand = () => {
    return products.filter((product: Element) => {
      const currentBrand = product
        .getAttribute('brand')
        ?.toLowerCase() as string
        
      return selectedBrands.includes(currentBrand)
    })
  }

  return {
    addBrand,
    removeFromBrands,
    filterProductsByBrand,
  }
}
