import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToastProvider from "./component/toast/ToastProvider.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// import "./libs1/css/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 2e3,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      // onError: (e: any) => {
      //   console.log(e?.message);
      //   // toast.error(e?.message);
      // }
    },
    mutations: {
      onError: (e: any) => {
        console.log(e?.message);
        // toast.error(e?.message);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
