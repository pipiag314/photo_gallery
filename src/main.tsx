import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SearchedContextProvider } from "./context/SearchedContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchedContextProvider>
      <App />
    </SearchedContextProvider>
  </React.StrictMode>
);
