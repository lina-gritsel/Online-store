import { getAllProducts } from '../../../api'
import { Card } from '../../../components/Card'
import { debounce } from '../../../functions/debounce'
import styles from './CatalogCardList.module.scss'

export const CatalogCardList = {
  render: async () => {
    const data = await getAllProducts()
    const newData = data.splice(0, 12)
    return `
    <div class=${styles.container}>
      <div class=${styles.wrapper}>
        <p class=${styles.path}>Главная / Каталог товаров</p>
        <button class=${styles.sortValues} id='sortValues'>Sort</button>
        <div class=${styles.sortWrapper} id='sortWrapper'>
          <button class=${
            styles.sortBtn
          } id="name-asc">Sort by Name (asc)</button>
          <button class=${
            styles.sortBtn
          } id="name-desc">Sort by Name (desc)</button>
          <button class=${
            styles.sortBtn
          } id="price-asc">Sort by Price (asc)</button>
          <button class=${
            styles.sortBtn
          } id="price-desc">Sort by Price (desc)</button>
        </div>
      </div>
      <div class=${styles.content} id='cards'>
      <p class=${
        styles.notFound
      } id='notFound'>По вашему запросу ничего не найдено</p>
      ${newData.map((data) => `${Card(data)}`).join('')}
      </div>
      <p class=${styles.link} id='loadMore'>Показать ещё</p>
    </div>
    `
  },
  afterRender: async () => {
    const sortValues = document.getElementById('sortValues')
    const sortWrapper = document.getElementById('sortWrapper')

    sortValues?.addEventListener('click', () => {
      sortWrapper?.classList.toggle(styles.showValues)
    })

    const search = () => {
      document.getElementById('search')?.addEventListener('keyup', () => {
        const inputEl = document.getElementById('search') as HTMLInputElement
        const inputValue = inputEl.value.toUpperCase().trim()

        const cards = [...document.querySelectorAll('#card')]
        const productNames = [...document.querySelectorAll('#cardTitle')]
        const notFound = document.getElementById(
          'notFound',
        ) as HTMLParagraphElement
        const loadMore = document.getElementById(
          'loadMore',
        ) as HTMLParagraphElement

        if (inputValue !== '') {
          productNames.forEach((nameEl: Element, index: number) => {
            if (!nameEl.textContent?.toUpperCase().includes(inputValue)) {
              cards[index].classList.add(styles.hidden)
              loadMore.style.display = 'none'
            } else {
              cards[index].classList.remove(styles.hidden)
              notFound.style.display = 'none'
              loadMore.style.display = 'block'
            }
          })
        } else {
          cards.forEach((card) => {
            card.classList.remove(styles.hidden)
            notFound.style.display = 'none'
            loadMore.style.display = 'block'
          })
        }
      })
    }
    search()
    // debounce(search, 300)
  },
}
