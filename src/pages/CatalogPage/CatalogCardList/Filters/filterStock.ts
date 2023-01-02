export const flterStock = () =>{
    const stockSlidersParent = document.getElementById(
        'filterStock',
      ) as HTMLElement

      const rangeSliders = stockSlidersParent.querySelectorAll(
        'input[type="range"]',
      ) as NodeListOf<HTMLInputElement>
      const minStockValue = document.getElementById(
        'minStockValue',
      ) as HTMLElement
      const maxStockValue = document.getElementById(
        'maxStockValue',
      ) as HTMLElement
      const cardsContainer = document.getElementById(
        'cardsContainer',
      ) as HTMLElement
      const cards = [...cardsContainer.children]

      const btnsFilter = [...document.querySelectorAll('.btnFilter')]

      btnsFilter.forEach((btn) => {
        btn.addEventListener('click', (event: Event) => {
          filter()
          event.stopPropagation()
        })
      })

      const filter = () => {
        // const products = getAvailableProducts()
    
        let valueStartSlider = parseFloat(rangeSliders[0].value)
        let valueEndSlider = parseFloat(rangeSliders[1].value)
    
        if (valueStartSlider > valueEndSlider) {
          ;[valueStartSlider, valueEndSlider] = [valueEndSlider, valueStartSlider]
        }
    
        rangeSliders[0].value = valueStartSlider.toString()
        rangeSliders[1].value = valueEndSlider.toString()
    
        minStockValue.innerHTML = `${valueStartSlider.toString()}`
        maxStockValue.innerHTML = `${valueEndSlider.toString()}`
    
        const minPrice = parseFloat(rangeSliders[0].value)
        const maxPrice = parseFloat(rangeSliders[1].value)
        const stockRange = Array.from(
            { length: maxPrice - minPrice + 1 },
            (_, i) => minPrice + i,
          )
    
        const filteredProductStock = cards.filter((product) => {
          const stockProduct = parseFloat(product.getAttribute('stock') as string)

          return stockRange.includes(stockProduct)
        })
    
        cards.forEach((product) => {
          product.classList.add('hidden')
        })
    
        if (filteredProductStock.length) {
            filteredProductStock.forEach((product) => {
            product.classList.remove('hidden')
          })
        }
      }

      rangeSliders.forEach((slider) => {
        slider.addEventListener('change', () => {
            console.log('here');
          filter()
        })
      })
}