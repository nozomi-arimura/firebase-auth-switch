import { Box } from "@material-ui/core";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { pagePath } from "./constants/pagePath.ts";
import Index from "./pages/index/index.page.tsx";
import Initialize from "./pages/initialize/index.page.tsx";
import { useAppRouter } from "./hooks/useAppRouter.ts";
import { ReactNode } from "react";
import { useLoading } from "./atoms/loading.ts";
import { Loading } from "./components/Loading";

const AppRouter = ({ children }: { children: ReactNode }) => {
  useAppRouter();
  return <>{children}</>;
};
const router = createBrowserRouter([
  {
    path: "/index.html",
    element: <Navigate to={pagePath.index} />,
  },
  {
    path: pagePath.index,
    element: (
      <AppRouter>
        <Index></Index>
      </AppRouter>
    ),
  },
  {
    path: pagePath.initialize,
    element: (
      <AppRouter>
        <Initialize />
      </AppRouter>
    ),
  },
]);
function App() {
  const { isLoading } = useLoading();
  return (
    <Box
      style={{
        minWidth: "30rem",
        maxWidth: "37.5rem",
        minHeight: "200px",
        padding: "0.5rem",
      }}
    >
      <Loading isLoading={isLoading} />
      <RouterProvider router={router}></RouterProvider>
    </Box>
  );
}

export default App;
