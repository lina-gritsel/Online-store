import { Products } from './types'

const baseUrl = 'https://my-json-server.typicode.com/store-api/api';

export const getAllProducts = async (): Promise<Products[]> => {
  const result = await fetch(
    `${baseUrl}/products`,
  )
  const data = await result.json()

  return data as Products[]
}

export const getProduct = async (id: string): Promise<Products> => {
  const result = await fetch(
    `${baseUrl}/products/${id}`,
  )
  const data = await result.json()

  return data as Products
}
