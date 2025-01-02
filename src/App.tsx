// REACT
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// LIBRARIES
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// PAGES
import { Home } from "./pages";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      index: true,
      element: <Home />,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
      </QueryClientProvider>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
