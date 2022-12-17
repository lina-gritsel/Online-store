// import router from './routes'

// const init = (): void => {
//   router(window.location.hash)

//   window.addEventListener('hashchange', () => {
//     router(window.location.hash)
//   })
// }

// window.addEventListener('load', init)

import router from './routes'
import ROUTES from './routes/routes'
;(async () => {
  router(ROUTES)
})()
