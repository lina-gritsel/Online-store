import { Component } from './../routes/routes';
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
}

export interface Categories {
  title: string
  image: Component
}
