import { compareNumbers } from './../../../utils/index'
import { Products } from './../../../api/types'
import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'
import styles from './CatalogCardList.module.scss'
import polygon from '../../../assets/svg/polygon.svg'

enum SortField {
  NAME = 'name',
  PRICE = 'price',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()
    const newData = data.splice(0, 12)
    return `
    <div class=${styles.container}>
      <div class=${styles.wrapper}>
        <p class=${styles.path}>Главная / Каталог товаров</p>
        <div  id='sortValues'>
          <button class=${
            styles.sortValues
          } id='globalSortBtn'>Порядок: сперва новые</button>
          <image class=${styles.sortImg} src=${polygon} />
        </div>
        <div class='${styles.sortWrapper}' id='sortWrapper'>
          <button class='${
            styles.sortBtn
          } btnSort' id="name-asc">Порядок: по имени (asc)</button>
          <button class='${
            styles.sortBtn
          } btnSort' id="name-desc"> Порядок: по имени (desc)</button>
          <button class='${
            styles.sortBtn
          } btnSort' id="price-asc">Порядок: по цене (asc)</button>
          <button class='${
            styles.sortBtn
          } btnSort' id="price-desc">Порядок: по цене (desc)</button>
        </div>
      </div>
      <div class=${styles.content} id='cardsContainer'>
      ${newData.map((data) => `${Card(data)}`).join('')}
      </div>
      <p class=${styles.link}>Показать ещё</p>
    </div>
    `
  },
  afterRender: async () => {
    const sortValues = document.getElementById('sortValues')
    const sortWrapper = document.getElementById('sortWrapper')
    const btnsSort = document.querySelectorAll('.btnSort')
    const cardsContainer = document.getElementById('cardsContainer')
    const body = document.querySelector('body')
    const globalSortBtn = document.getElementById(
      'globalSortBtn',
    ) as HTMLElement

    sortValues?.addEventListener('click', (e) => {
      sortWrapper?.classList.toggle(styles.showValues)
      e.stopPropagation()
    })

    body?.addEventListener('click', () => {
      if (sortWrapper?.classList.contains(styles.showValues)) {
        sortWrapper.classList.remove(styles.showValues)
      }
    })

    const sorting = async () => {
      const products = await getAllProducts()
      btnsSort.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const selectedBtn = (e as any)?.target
          const sortField = (e as any)?.target.id
          const sortArray = sortProducts(sortField, products)
          globalSortBtn.innerHTML = ''
          globalSortBtn.innerHTML = `${selectedBtn.textContent}`


          // window.history.replaceState(
          //   {},
          //   document.title,
          //   `${window.location}/${sortField}`
          // )

          if (cardsContainer) {
            cardsContainer.innerHTML = ''
            cardsContainer.insertAdjacentHTML(
              'beforeend',
              `${sortArray.map((data) => `${Card(data)}`).join('')}`,
            )
          }
        })
      })
    }
    sorting()

    const sortProducts = (sortField: any, products: Products[]) => {
      const [sortBy, sortOrder] = sortField.split('-')
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
  },
}
