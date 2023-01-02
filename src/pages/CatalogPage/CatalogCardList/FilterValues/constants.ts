import styles from '../CatalogCardList.module.scss'

export const SORT_VALUES = [
  { label: 'Order: by name (asc)', value: 'name-asc' },
  { label: 'Order: by name (desc)', value: 'name-desc' },
  { label: 'Order: by price (asc)', value: 'price-asc' },
  { label: 'Order: by price (desc)', value: 'price-desc' },
]

export const FILTER_VALUES_CATEGORIES = [
  { label: 'For relax', value: 'relax' },
  { label: 'For work', value: 'job' },
  { label: 'For kitchen', value: 'kitchen' },
  { label: 'For children', value: 'kids' },
  { label: 'For bathroom', value: 'bathroom' },
]

export const FILTER_VALUES_BRANDS = [
  { label: 'Jonathan Adler', value: 'jonathan-adler' },
  { label: 'AllModern', value: 'allmodern' },
  { label: 'Burke Decor', value: 'burke-decor' },
  { label: 'BenchmadeM', value: 'benchmade-modern' },
  { label: 'Castlery', value: 'castlery' },
]
