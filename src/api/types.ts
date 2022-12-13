export interface Products {
    id: number
    title: string
    price: number
    description: string
    category: {
      id: number
      name: string
      image: string
    }
    image: string
  }

 export interface Categories{
    title: string
    image: any
  }