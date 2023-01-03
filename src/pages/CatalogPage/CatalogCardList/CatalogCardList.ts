import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'
import styles from './CatalogCardList.module.scss'
import polygon from '../../../assets/svg/polygon.svg'
import order5 from '../../../assets/svg/order5.svg'
import order3 from '../../../assets/svg/order3.svg'
import { useSort } from './Sort/useSortProducts'
import { useGrid } from './useGrid'
import { useSearch } from './useSearch'
import { useFilter } from './useFilter'
import { addToCart } from './addToCart'
import {
  FilterSlider,
  FilterValues,
  SortValues,
} from './FilterValues/filterValues'
import {
  FILTER_VALUES_BRANDS,
  FILTER_VALUES_CATEGORIES,
} from './FilterValues/constants'

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()

    const maxPrice =
      JSON.parse(localStorage.getItem('storageMaxPrice') as string) || '1500'
    const minPrice =
      JSON.parse(localStorage.getItem('storageMinPrice') as string) || '0'
    const minStock =
      JSON.parse(localStorage.getItem('minStock') as string) || '0'
    const maxStock =
      JSON.parse(localStorage.getItem('maxStock') as string) || '100'

    return `
    <div class=${styles.container}>
      <div class=${styles.wrapper}>
        <p class=${styles.path}>Home / Catalog</p>
        <div class=${styles.sortMainButton}  id='sortValues'>
          <button class=${
            styles.sortValues
          } id='globalSortBtn'>Order: new first</button>
          <image class=${styles.sortImg} id='sortImg' src=${polygon} />
        </div>
        <div class='${styles.sortWrapper}' id='sortWrapper'>
        ${SortValues.render()}
        </div>
        <div class=${styles.filterMainButton}  id='filterValues'>
          <button class=${
            styles.filterValues
          } id='globalFilterBtn'>Filters</button>
          <image class=${styles.filterImg} id='filterImg' src=${polygon} />
        </div>
        <div class='${styles.filterWrapper}' id='filterWrapper'>
          <p class=${styles.categoryTitle}>Categories</p>
          <div class=${styles.line}></div>
          <div class=${styles.categoryBox}>
            ${FilterValues.render({
              sortValues: FILTER_VALUES_CATEGORIES,
              className: 'category',
            })}
          </div>
          <div class=${styles.line}></div>
          <p class=${styles.categoryTitle}>Brands</p>
          <div class=${styles.line}></div>
          <div class=${styles.categoryBox}>
            ${FilterValues.render({
              sortValues: FILTER_VALUES_BRANDS,
              className: 'brand',
            })}
          </div>
          <div class=${styles.line}></div>
          <div class=${styles.sliderBlock}>
            <div class=${styles.price} id='filterPrice'>
              <p class=${styles.categoryTitle}>Price</p>
              <div class=${styles.slidersControl}>
                ${FilterSlider.render({
                  id: 'startSlider',
                  value: minPrice,
                  className: `${styles.sliderPriceInput} ${styles.startSlider}`,
                  max: '1500',
                })}
                ${FilterSlider.render({
                  id: 'endSlider',
                  value: maxPrice,
                  className: `${styles.sliderPriceInput}`,
                  max: '1500',
                })}
              </div>
              <div class=${styles.formControl}>
                <div class=${styles.formControlItems} id='minPriceNumber'>
                  0$
                </div>
                <div class=${styles.formControlItems} id='maxPriceNumber'>
                 1500$
                </div>
              </div>
            </div>
            <div class=${styles.price} id='filterStock'>
              <p class=${styles.categoryTitle}>Stock</p>
              <div class=${styles.slidersControl}>
                ${FilterSlider.render({
                  id: 'startSlider',
                  value: minStock,
                  className: `${styles.sliderStockInput} ${styles.startSlider}`,
                  max: '100',
                })}
                ${FilterSlider.render({
                  id: 'endSlider',
                  value: maxStock,
                  className: `${styles.sliderStockInput}`,
                  max: '100',
                })}
              </div>
              <div class=${styles.formControl}>
                <div class=${styles.formControlItems} id='minStockValue'>
                  0
                </div>
                <div class=${styles.formControlItems} id='maxStockValue'>
                 100
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=${styles.orderProducts}>
          <div class='${styles.order} order' id='smallGrid'>
            <img class=${styles.orderBtn} src=${order3}/>
          </div>
          <div class='${styles.order} order' id='langeGrid'>
            <img class=${styles.orderBtn} src=${order5}/>
          </div>
        </div>
      </div>
      <p class=${styles.notFoundProducts} id='notFound'></p>
      <div class=${styles.content} id='cardsContainer'>
      ${data.map((data) => `${Card(data)}`).join('')}
      </div>
    </div>
    `
  },
  afterRender: async () => {
    const products = await getAllProducts()

    products.forEach((product) => (product.isInCart = false))

    useFilter()
    useSort()
    useGrid()
    useSearch()
    addToCart({ products })
  },
}
