import { createStore } from "redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const initStore = () => {
  const store = createStore(
    persistedReducer,
    {},
    typeof window !== "undefined" && window.devToolsExtension
      ? window.devToolsExtension()
      : (f) => f
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default initStore;
