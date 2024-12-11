import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./components/PageNotFound";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#483de0",
              color: "#ffffff",
              border: "1px solid #e0e0e0",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
