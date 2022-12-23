import { MOUNTHS_IN_YEAR } from '../constants'

export const checkCardTerm = (): void => {
  const monthInput = document.getElementById('month') as HTMLInputElement
  const yearInput = document.getElementById('year') as HTMLInputElement

  const focusSibling = (
    target: any,
    direction: string,
    callback?: (value?: any) => void,
  ) => {
    const nextTarget = target[direction]
    nextTarget && nextTarget.focus()
    callback && callback(nextTarget)
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
    value.length >= 2 && focusSibling(event.target, 'nextElementSibling')
    event.stopImmediatePropagation()
  })

  yearInput?.addEventListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'Backspace' &&
      (event.target as HTMLInputElement).selectionStart === 0
    ) {
      focusSibling(event.target, 'previousElementSibling')
      event.stopImmediatePropagation()
    }
  })

  const inputMatchesPattern = (e: any) => {
    const { value, selectionStart, selectionEnd, pattern } = e.target

    const character = String.fromCharCode(e.which)
    const proposedEntry =
      value.slice(0, selectionStart) + character + value.slice(selectionEnd)
    const match = proposedEntry.match(pattern)

    return (
      e.metaKey ||
      e.which <= 0 ||
      e.which == 8 ||
      (match && match['0'] === match.input)
    )
  }

  document.querySelectorAll('input[data-pattern-validate]').forEach((el) =>
    el.addEventListener('keypress', (e) => {
      if (!inputMatchesPattern(e)) {
        return e.preventDefault()
      }
    }),
  )
}
