export const arrayFilterPrice = () => {
  const priceSlidersParent = document.getElementById(
    'filterPrice',
  ) as HTMLElement
  const rangeSliders = priceSlidersParent.querySelectorAll(
    'input[type="range"]',
  ) as NodeListOf<HTMLInputElement>
  const minPriceNumber = document.getElementById(
    'minPriceNumber',
  ) as HTMLElement
  const maxPriceNumber = document.getElementById(
    'maxPriceNumber',
  ) as HTMLElement
  const cardsContainer = document.getElementById(
    'cardsContainer',
  ) as HTMLElement
//   const products = [...cardsContainer.children]

  rangeSliders.forEach((slider) => {
    slider.addEventListener('change', () => {
      let slider1 = parseFloat(rangeSliders[0].value)
      let slider2 = parseFloat(rangeSliders[1].value)

      if (slider1 > slider2) {
        ;[slider1, slider2] = [slider2, slider1]
      }

      rangeSliders[0].value = slider1.toString()
      rangeSliders[1].value = slider2.toString()

      minPriceNumber.innerHTML = `${slider1.toString()}$`
      maxPriceNumber.innerHTML = `${slider2.toString()}$`

      const minPrice = parseFloat(rangeSliders[0].value)
      const maxPrice = parseFloat(rangeSliders[1].value)
      const priceRange = Array.from(
        { length: maxPrice - minPrice + 1 },
        (_, i) => minPrice + i,
      )
      console.log([...cardsContainer.children]);
      const filteredProductPrice = [...cardsContainer.children].filter(
        (product) => {
          const priceProduct = parseFloat(
            product.getAttribute('price') as string,
          )

          return priceRange.includes(priceProduct)
        },
      )
      console.log(filteredProductPrice);

      [...cardsContainer.children].forEach((product) => {
        product.classList.add('hidden')
      })

      if (filteredProductPrice.length) {
        filteredProductPrice.forEach((product) => {
          product.classList.remove('hidden')
        })
      }
    })
  })
}
