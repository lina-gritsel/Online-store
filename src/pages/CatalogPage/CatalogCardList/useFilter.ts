import styles from './CatalogCardList.module.scss'

type useFilter = () => void

export const useFilter: useFilter = () => {
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const btnsFilter = [...document.querySelectorAll('.btnFilter')]
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLDivElement

  const products = [...cardsContainer.children]
  let selectedFilter: string[] = []

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      const selectedBtn = e.target as HTMLInputElement
      const filterField = selectedBtn?.id

      const searchURL = new URL((window as any).location)
      searchURL.searchParams.set('filterBy', filterField)
      window.history.pushState({}, '', searchURL)

      if (selectedBtn.checked) {
        selectedBtn.classList.add('checked')
        selectedBtn.classList.remove('disabled')
        selectedFilter.push(filterField)
      } else {
        selectedBtn.classList.remove('checked')
        selectedBtn.classList.add('disabled')

        selectedFilter = selectedFilter.filter((category) => {
          return category !== filterField
        })
      }

      const filteredProduct = products.filter((product: Element) => {
        const currentCategory = product.getAttribute('category') as string
        return selectedFilter.includes(currentCategory)
      })

      products.forEach((product) => {
        product.classList.add('hidden')
      })

      filteredProduct.forEach((product) => {
        product.classList.remove('hidden')
      })

      if (btnsFilter.every((btn) => btn.classList.contains('disabled'))) {
        products.forEach((product) => {
          product.classList.remove('hidden')
        })
      }
    })
  })

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })
}
