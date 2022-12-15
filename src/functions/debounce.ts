export const debounce = <F extends (...args: any[]) => any>(fn: F, ms: number) => {
    let timeout: ReturnType<typeof setTimeout>

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise((resolve) => {
        if (timeout) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => resolve(fn(...args)), ms)
      })
  }