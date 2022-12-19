import { Products } from './types'

const baseUrl = 'https://gentle-seal-overshirt.cyclic.app'

export const getAllProducts = async (): Promise<Products[]> => {
  const result = await fetch(`${baseUrl}/products`)
  const { products } = await result.json()

  return products as Products[]
}

export const getProduct = async (id: string): Promise<Products> => {
  const result = await fetch(`${baseUrl}/products/${id}`)
  const  { product }  = await result.json()
  return product as Products
}
