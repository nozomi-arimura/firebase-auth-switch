import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "jotai";
import Index from "./pages/index/index.page.tsx";
import { PagePath } from "./constants/PagePath.ts";
const router = createHashRouter([
  {
    path: PagePath.index,
    element: <Index />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
