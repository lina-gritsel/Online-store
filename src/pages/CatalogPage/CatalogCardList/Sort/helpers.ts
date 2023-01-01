import styles from '../CatalogCardList.module.scss'

export const onClickOutside = (): void => {
  const sortWrapper = document.getElementById('sortWrapper')
  const sortImg = document.getElementById('sortImg') as HTMLImageElement

  if (
    sortWrapper?.classList.contains(styles.showValues) &&
    sortImg?.classList.contains(styles.imgRotate)
  ) {
    sortWrapper.classList.remove(styles.showValues)
    sortImg.classList.remove(styles.imgRotate)
  }
}

export const toggleSortDropdownVisible = (): void => {
  const sortWrapper = document.getElementById('sortWrapper')
  const sortImg = document.getElementById('sortImg') as HTMLImageElement

  sortWrapper?.classList.toggle(styles.showValues)
  sortImg.classList.toggle(styles.imgRotate)
}