export enum SortField {
  NAME = 'name',
  PRICE = 'price',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type UseSort = () => void