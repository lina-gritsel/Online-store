export const renderPromoSummary = {
  renderSummaryWithPromo: () => {
    const codesContainer = document.getElementById('codes') as HTMLDivElement
    const totalPrice = document.getElementById('total') as HTMLParagraphElement
    const promoTotal = document.getElementById(
      'promoTotal',
    ) as HTMLParagraphElement

    codesContainer.style.display = 'flex'
    promoTotal.style.display = 'block'
    totalPrice.style.textDecoration = 'line-through'
  },

  renderSummaryWithoutPromo: () => {
    const codesContainer = document.getElementById('codes') as HTMLDivElement
    const totalPrice = document.getElementById('total') as HTMLParagraphElement
    const promoTotal = document.getElementById(
      'promoTotal',
    ) as HTMLParagraphElement

    totalPrice.style.textDecoration = 'none'
    codesContainer.style.display = 'none'
    promoTotal.style.display = 'none'
  },
}
