import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import loginReducer from "./slices/loginSlice";
import planReducer from "./slices/planSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


const rootReducer = combineReducers({
  theme: themeReducer,
  loggedIn: loginReducer,
  plan: planReducer,
})

const persistConfig = {
  key: "root",
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
})
const persistor = persistStore(store)
export const CustomProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate  persistor={persistStore(store)}>
      {children}
    </PersistGate>
  </Provider>
)
