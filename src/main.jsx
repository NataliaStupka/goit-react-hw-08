import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import "modern-normalize";
import { Toaster } from "react-hot-toast";

// 1. Імпортуємо провайдер
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store"; // 2. Імпортуємо створений стор; persistor
import { BrowserRouter } from "react-router-dom"; // Маршрутизатор
import { PersistGate } from "redux-persist/integration/react"; // 'localStorage'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
