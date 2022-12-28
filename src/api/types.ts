export interface Products {
  id: number
  title: string
  price: number
  brand: string
  rating: number
  stock: number
  description: string
  category: string
  image: string[]
  numberOfUnits: number
  isInCart: boolean
}

export interface Categories {
  title: string
  image: any
}
