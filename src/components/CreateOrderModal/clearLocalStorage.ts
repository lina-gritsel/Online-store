export const clearLocalStorage = () => {
  localStorage.removeItem('amountOfProducts')
  localStorage.removeItem('priceOfProducts')
  localStorage.removeItem('isOrdering')
  localStorage.removeItem('products')
  localStorage.removeItem('product')
  localStorage.removeItem('cart')
}
