import {Products} from './types'

export const getAllProducts = async (): Promise<Products[]> => {
    const result = await fetch('https://raw.githubusercontent.com/lina-gritsel/Catalot-online-store/main/catalog.json')
    const data = await result.json()
  
    return data as Products[]
  }