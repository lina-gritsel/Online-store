export const filteringBrands = () => {
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement

  let selectedBrands: string[] = []

  const products = [...cardsContainer.children]

  const addBrand = (brand: string) => {
    selectedBrands.push(brand)
  }

  const removeFromBrands = (brand: string) => {
    selectedBrands = selectedBrands.filter((selectedBrand) => {
      return selectedBrand !== brand
    })
  }

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
