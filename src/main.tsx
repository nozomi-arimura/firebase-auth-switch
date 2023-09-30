import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "jotai";
import Index from "./pages/index/index.page.tsx";
import { PagePath } from "./constants/PagePath.ts";
import { Box, ThemeProvider } from "@material-ui/core";
import theme from "./libs/theme.ts";
const router = createHashRouter([
  {
    path: PagePath.index,
    element: <Index />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <Box style={{ width: "37.5rem", minHeight: "200px" }}>
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
