import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import { ThemeProvider } from "@material-ui/core";
import theme from "./libs/theme.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
