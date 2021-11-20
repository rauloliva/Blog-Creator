import '../styles/app.css'
import { Suspense } from 'react'
import getStore from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  const { store, persistor } = getStore()

  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Suspense fallback={ <div>Loading...</div> }>
          <Component {...pageProps} />
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
