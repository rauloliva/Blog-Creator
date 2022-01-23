import "../styles/app.css";
import { Suspense } from "react";
import getStore from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const { store, persistor } = getStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
