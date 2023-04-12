import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'

import appWithSession from '@/hoc/appWithSession'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default appWithSession(appWithTranslation(MyApp))
