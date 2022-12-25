export const compareNumbers = (numberA = 0, numberB = 0, desc = true): number => {
  if (desc) {
    if (numberA > numberB) return -1
  } else if (numberB > numberA) return -1
  return 1
}

export const parseRequestURL = (
  url: string,
): {
  resource: string
  id: string
} => {
  const [, resource, id] = url.split('/')

  return { resource, id }
}
