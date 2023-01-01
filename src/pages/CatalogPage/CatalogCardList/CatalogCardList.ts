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
import { arrayFilterPrice } from './Filters/filterByPrice'
import { FilterValues, SortValues } from './SortValues/sortValues'
import {
  FILTER_VALUES_BRANDS,
  FILTER_VALUES_CATEGORIES,
} from './SortValues/constants'

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()

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
                <input
                  class="${styles.sliderPriceInput} ${styles.startSlider}" 
                  id="startSlider" 
                  type="range" 
                  value="0" 
                  min="1" 
                  max="1500"  
                  step="1">
                <input 
                  class=${styles.sliderPriceInput}
                  id="endSlider" 
                  type="range" 
                  value="1500" 
                  min="1"
                  max="1500"  
                  step="1">
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
            <p class=${styles.categoryTitle}>Stock</p>
            <input
              type="range"
              min="1" 
              max="100" 
              value="0" 
              step="1" 
              class=${styles.slider}>
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
      <p class=${styles.notFoundProducts} id='notFoundProducts'></p>
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
    arrayFilterPrice()
    useSort()
    useGrid()
    useSearch()
    addToCart({ products })
  },
}
