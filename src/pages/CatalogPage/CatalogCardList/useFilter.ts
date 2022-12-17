import styles from './CatalogCardList.module.scss'

export const useFilter = () => {
  const filterValues = document.getElementById('filterValues')
  const filterWrapper = document.getElementById('filterWrapper')
  const filterImg = document.getElementById('filterImg') as HTMLImageElement
  const body = document.querySelector('body')

  filterValues?.addEventListener('click', (e: MouseEvent) => {
    filterWrapper?.classList.toggle(styles.showValues)
    filterImg.classList.toggle(styles.imgRotate)
    e.stopPropagation()
  })

  // body?.addEventListener('click', () => {
  //   if (
  //     filterWrapper?.classList.contains(styles.showValues) &&
  //     filterImg?.classList.contains(styles.imgRotate)
  //   ) {
  //     filterWrapper.classList.remove(styles.showValues)
  //     filterImg.classList.remove(styles.imgRotate)
  //   }
  // })
}
