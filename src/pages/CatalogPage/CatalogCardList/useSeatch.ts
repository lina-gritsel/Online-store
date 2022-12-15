import styles from './CatalogCardList.module.scss'

enum OrderCards {
  SMALL = 'orderSmall',
  MANY = 'orderMany',
}

export const useSeatch = () => {
  const cardsContainer = document.getElementById('cardsContainer')

  const newCards = cardsContainer?.children as any
  const arrayCards = [...newCards]

  const orderBtns = document.querySelectorAll('.order')
  orderBtns.forEach((btn: any) => {
    btn.addEventListener('click', () => {
      if (btn.id === OrderCards.MANY) {
        cardsContainer?.classList.add(`${styles.newOrder}`)
        arrayCards.forEach((card: any) => {
          card.classList.add(`${styles.newViewCard}`)
        })
      }
      if (btn.id === OrderCards.SMALL) {
        cardsContainer?.classList.remove(`${styles.newOrder}`)
        arrayCards.forEach((card: any) => {
          card.classList.remove(`${styles.newViewCard}`)
        })
      }
    })
  })
}
