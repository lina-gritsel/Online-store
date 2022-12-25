import { MOUNTHS_IN_YEAR } from '../constants'

export const checkCardTerm = (): void => {
  const monthInput = document.getElementById('month') as HTMLInputElement
  const yearInput = document.getElementById('year') as HTMLInputElement

  const focusSibling = (
    target: HTMLInputElement,
    direction: 'nextElementSibling' | 'previousElementSibling',
  ) => {
    const nextTarget = target[direction] as HTMLInputElement
    nextTarget && nextTarget?.focus()
  }

  monthInput?.addEventListener('input', (event: Event) => {
    const targetValue = event.target as HTMLInputElement
    const value = targetValue.value

    const valueNumber = parseFloat(value)

    if (value.length === 1 && valueNumber > 1) {
      ;(event.target as HTMLInputElement).value = '0' + value
    }
    if (value === '00') {
      ;(event.target as HTMLInputElement).value = '01'
    } else if (valueNumber > MOUNTHS_IN_YEAR) {
      ;(event.target as HTMLInputElement).value = '12'
    }
    value.length >= 2 && focusSibling(targetValue, 'nextElementSibling')
    event.stopImmediatePropagation()
  })

  yearInput?.addEventListener('keydown', (event: KeyboardEvent) => {
    const targetValue = event.target as HTMLInputElement

    if (event.key === 'Backspace' && targetValue.selectionStart === 0) {
      focusSibling(targetValue, 'previousElementSibling')
      event.stopImmediatePropagation()
    }
  })

  const inputMatchesPattern = (event: KeyboardEvent) => {
    const targetValue = event.target as HTMLInputElement
    const { value, selectionStart, selectionEnd, pattern } = targetValue
 
    const character = String.fromCharCode(event.which)
    const proposedEntry =
      value.slice(0, selectionStart || 0) +
      character +
      value.slice(selectionEnd || 0)
    const match = proposedEntry.match(pattern)

    return event.metaKey || (match && match['0'] === match.input)
  }

  document.querySelectorAll('input[data-pattern-validate]').forEach((el) =>
    el.addEventListener('keypress', (event: any) => {
      if (!inputMatchesPattern(event)) {
        return event.preventDefault()
      }
    }),
  )
}
