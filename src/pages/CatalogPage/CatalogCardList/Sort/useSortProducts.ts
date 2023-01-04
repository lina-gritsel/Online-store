import { onClickOutside, toggleSortDropdownVisible } from './helpers'
import { sort } from './sortProducts'
import { UseSort } from './models'

export const useSort: UseSort = () => {
  const sortValues = document.getElementById('sortValues')
  const btnsSort = document.querySelectorAll('.btnSort')
  const body = document.querySelector('body')
  const globalSortBtn = document.getElementById('globalSortBtn') as HTMLElement
  
  const onChangeSort = (event: Event) => {
    const selectedBtn = event?.target as HTMLElement
    const sortField = selectedBtn.id
    
    sort(sortField)
    globalSortBtn.innerHTML = ''
    globalSortBtn.innerHTML = `${selectedBtn.textContent}`
  }

  btnsSort.forEach((btn) => {
    btn.addEventListener('click', (event: Event) => {
      onChangeSort(event)
    })
  })

  sortValues?.addEventListener('click', (event: MouseEvent) => {
    toggleSortDropdownVisible()
    event.stopPropagation()
  })

  body?.addEventListener('click', () => {
    onClickOutside()
  })

 const storageSortBy =  localStorage.getItem('sortBy')
 const storageOrderBy =  localStorage.getItem('sortOrder')
  const fieldsJoin = [storageSortBy, storageOrderBy].join('-')
  sort(fieldsJoin)

}
