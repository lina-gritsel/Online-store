import { getAllProducts, getProduct } from '../../../api'
import { Card } from '../../../components/Card'
import styles from './CatalogCardList.module.scss'
import polygon from '../../../assets/svg/polygon.svg'
import order5 from '../../../assets/svg/order5.svg'
import order3 from '../../../assets/svg/order3.svg'
import { useSort } from './useSort'
import { useGrid } from './useGrid'
import { useSearch } from './useSearch'
import { useFilter } from './useFilter'

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()
    const newData = data.splice(0, 12)

    return `
    <div class=${styles.container}>
      <div class=${styles.wrapper}>
        <p class=${styles.path}>Главная / Каталог товаров</p>
        <div class=${styles.sortMainButton}  id='sortValues'>
          <button class=${
            styles.sortValues
          } id='globalSortBtn'>Порядок: сперва новые</button>
          <image class=${styles.sortImg} id='sortImg' src=${polygon} />
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
        <div class=${styles.filterMainButton}  id='filterValues'>
          <button class=${
            styles.filterValues
          } id='globalFilterBtn'>Фильтры</button>
          <image class=${styles.filterImg} id='filterImg' src=${polygon} />
        </div>
        <div class='${styles.filterWrapper}' id='filterWrapper'>
          <p class=${styles.categoryTitle}>Категории</p>
          <div class=${styles.line}></div>
          <div class=${styles.categoryBox}>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Для отдыха
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Для работы
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Для кухни
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Для детской
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Для ванной
            </label>
          </div>
          <div class=${styles.line}></div>
          <p class=${styles.categoryTitle}>Бренды</p>
          <div class=${styles.line}></div>
          <div class=${styles.categoryBox}>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Jonathan Adler
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>AllModern
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Burke Decor
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>BenchmadeM
            </label>
            <label class=${styles.categoryName}>
              <input class=${styles.categoryCheckbox} type=checkbox>Castlery
            </label>
          </div>
          <div class=${styles.line}></div>
          <p class=${styles.categoryTitle}>Цена</p>
          <input type="range" min="1" max="100" value="100" step="1" class=${styles.slider}>
          <div class=${styles.line}></div>
          <p class=${styles.categoryTitle}>Количество</p>
          <input type="range" min="1" max="100" value="100" step="1" class=${styles.slider}>
        </div>
        <div class=${styles.orderProducts}>
          <div class='${styles.order} order' id='orderSmall'>
            <img class=${styles.orderBtn} src=${order3}/>
          </div>
          <div class='${styles.order} order' id='orderMany'>
            <img class=${styles.orderBtn} src=${order5}/>
          </div>
        </div>
      </div>
      <p class=${
        styles.notFound
      } id='notFound'>По вашему запросу ничего не найдено</p>
      <div class=${styles.content} id='cardsContainer'>
      ${newData.map((data) => `${Card(data)}`).join('')}
      </div>
      <p class=${styles.link} id='loadMore'>Показать ещё</p>
    </div>
    `
  },
  afterRender: async () => {
    const products = await getAllProducts()
    const cards = [...document.querySelectorAll('.cardLink')]

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const cardInfo = getProduct(card.id)
        console.log(cardInfo)
      })
    })

    useSort({ products })
    useGrid()
    useSearch()
    useFilter()
  },
}
