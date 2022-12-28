import { Products } from './../../../api/types'

export const setCartStateToLocalStorage = ({
  products,
  cart,
}: {
  products: Products[]
  cart: Products[]
}) => {
  localStorage.setItem('products', JSON.stringify(products))
  localStorage.setItem('cart', JSON.stringify(cart))
}
