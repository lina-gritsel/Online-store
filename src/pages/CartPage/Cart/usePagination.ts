import { Products } from '../../../api'
import { CartCard } from '../../../components/CartCard'
import { useCart } from './useCart'

export const usePagination = () => {
  const limitInput = document.getElementById('limitInput') as HTMLInputElement
  const pageNum = document.getElementById('page') as HTMLParagraphElement
  const cartContainer = document.getElementById(
    'cartContainer',
  ) as HTMLDivElement

  let cart: Products[] =
    JSON.parse(localStorage.getItem('cart') as string) || []
  let currentPage = 1
  let rows: number =
    JSON.parse(localStorage.getItem('limit') as string) ||
    parseInt(limitInput.defaultValue)
  let pagesCount = Math.ceil(cart.length / rows)

  pageNum.innerHTML = `${currentPage}`
  limitInput.value = `${rows}`

  const displayCartList = (
    cartData: Products[],
    rowsPerPage: number,
    page: number,
  ) => {
    const cartURL = new URL(window.location.href)
    cartURL.searchParams.set('limit', `${rows}`)
    cartURL.searchParams.set('page', `${page}`)
    window.history.pushState({}, '', cartURL)

    page--

    const start = rowsPerPage * page
    const end = start + rowsPerPage
    const paginatedData = cartData.slice(start, end)

    cartContainer.innerHTML = paginatedData
      .map((data) => `${CartCard(data)}`)
      .join('')

    useCart()
  }

  const nextPage = (pagesCount: number) => {
    const nextPageBtn = document.getElementById('nextPage') as HTMLButtonElement

    nextPageBtn.addEventListener('click', () => {
      cart = JSON.parse(localStorage.getItem('cart') as string)
      pagesCount = Math.ceil(cart.length / rows)

      if (currentPage === pagesCount) {
        return currentPage
      } else {
        currentPage++
        pageNum.innerHTML = `${currentPage}`
      }

      displayCartList(cart, rows, currentPage)
    })
  }

  const prevPage = () => {
    const prevPageBtn = document.getElementById('prevPage') as HTMLButtonElement

    prevPageBtn.addEventListener('click', () => {
      cart = JSON.parse(localStorage.getItem('cart') as string)
      pagesCount = Math.ceil(cart.length / rows)

      if (currentPage === 1) {
        return currentPage
      } else {
        currentPage--
        pageNum.innerHTML = `${currentPage}`
      }

      displayCartList(cart, rows, currentPage)
    })
  }

  displayCartList(cart, rows, currentPage)
  nextPage(pagesCount)
  prevPage()

  limitInput.addEventListener('keyup', () => {
    if (!limitInput.value) {
      rows = parseInt(limitInput.defaultValue)
      currentPage = 1
      pageNum.innerHTML = `${currentPage}`

      displayCartList(cart, rows, currentPage)

      localStorage.setItem('limit', JSON.stringify(rows))
    } else {
      rows = parseInt(limitInput.value)
      currentPage = 1
      pageNum.innerHTML = `${currentPage}`

      displayCartList(cart, rows, currentPage)

      localStorage.setItem('limit', JSON.stringify(rows))
    }
  })
}
