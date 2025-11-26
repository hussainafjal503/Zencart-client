"use client";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persitor } from "./store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>{children}</PersistGate>
    </Provider>
  );
}
