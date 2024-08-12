import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import loginSlice from "./slices/loginSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
export const ThemeProvider = ({ children }) => {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export const LoginProvider = ({ children }) => {
  const persistConfig = {
    key: "root",
    storage
  }

  const persistedReducer = persistReducer(persistConfig, loginSlice);

  const store = configureStore({
    reducer: {
      loggedIn: persistedReducer 
    },
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>{children}</PersistGate>
    </Provider>
  );
};
