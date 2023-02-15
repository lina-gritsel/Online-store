import { Products } from './types'

const baseUrl = 'https://strange-shawl-mite.cyclic.app'

export const getAllProducts = async <T extends Products[]>(): Promise<T> => {
  const result = await fetch(`${baseUrl}/products`)
  const { products } = await result.json()
  return products
}

export const getProduct = async <T extends Products>(
  id: string,
): Promise<T> => {
  const result = await fetch(`${baseUrl}/products/${id}`)
  const { product } = await result.json()
  return product
}
