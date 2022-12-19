import styles from './CatalogCardList.module.scss'
import { Products } from './../../../api'
import { Card } from '../../../components/Card'

type useFilter = (args: { products: Products[] }) => void

enum FilterCategory {
  RELAX = 'relax',
  JOB = 'job',
  KITCHEN = 'kitchen',
  KIDS = 'kids',
  BATHROOM = 'bathroom',
}

enum FilterBrand {
  ADLER = 'adler',
  MODERN = 'modern',
  BURKE = 'burke',
  BENCH = 'bench',
  CASTLERY = 'castlery',
}

export const useFilter: useFilter = ({ products }) => {
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const btnsFilter = [...document.querySelectorAll('.btnFilter')]
  const cardsContainer = document.getElementById('cardsContainer') as HTMLDivElement

  const filterProducts = (filterField: string, products: Products[]) => {
    const filterBy = filterField

    const searchURL = new URL((window as any).location)
    searchURL.searchParams.set('filterBy', filterBy)
    window.history.pushState({}, '', searchURL)

    return products.filter((product): any => {
      if (filterBy === FilterCategory.RELAX) {
        return product.category === 'relax'
      }
      if (filterBy === FilterCategory.JOB) {
        return product.category === 'job'
      }
      if (filterBy === FilterCategory.KITCHEN) {
        return product.category === 'kitchen'
      }
      if (filterBy === FilterCategory.KIDS) {
        return product.category === 'kids'
      }
      if (filterBy === FilterCategory.BATHROOM) {
        return product.category === 'bathroom'
      }
      if (filterBy === FilterBrand.ADLER) {
        return product.brand === 'Jonathan Adler'
      }
      if (filterBy === FilterBrand.MODERN) {
        return product.brand === 'AllModern'
      }
      if (filterBy === FilterBrand.BURKE) {
        return product.brand === 'Burke Decor'
      }
      if (filterBy === FilterBrand.BENCH) {
        return product.brand === 'Benchmade Modern'
      }
      if (filterBy === FilterBrand.CASTLERY) {
        return product.brand === 'Castlery'
      }
    })
  }

  console.log(products)

  btnsFilter.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedBtn = (e as any)?.target

      if (selectedBtn.checked) {
        selectedBtn.classList.add('checked')
        selectedBtn.classList.remove('disabled')
      } else {
        selectedBtn.classList.remove('checked')
        selectedBtn.classList.add('disabled')
      }

      const filterField = (e as any)?.target.id
      const filterArray = filterProducts(filterField, products)

      if (cardsContainer) {
        cardsContainer.innerHTML = ''
        cardsContainer.insertAdjacentHTML(
          'beforeend',
          `${filterArray.map((data) => `${Card(data)}`).join('')}`,
        )
      }
      if (btnsFilter.every((btn) => btn.classList.contains('disabled'))) {
        cardsContainer.innerHTML = ''
        cardsContainer.insertAdjacentHTML(
          'beforeend',
          `${products.map((data) => `${Card(data)}`).join('')}`,
        )
      }
    })
  })

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })
}
