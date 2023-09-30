import { Box } from "@material-ui/core";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { pagePath } from "./constants/pagePath.ts";
import Index from "./pages/index/index.page.tsx";
import Initialize from "./pages/initialize/index.page.tsx";

const router = createHashRouter([
  {
    path: pagePath.index,
    element: <Index />,
  },
  {
    path: pagePath.initialize,
    element: <Initialize />,
  },
]);
function App() {
  return (
    <Box
      style={{
        minWidth: "30rem",
        maxWidth: "37.5rem",
        minHeight: "200px",
        padding: "0.5rem",
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
