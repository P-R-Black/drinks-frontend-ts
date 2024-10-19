import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import './index.css'
import { router } from "./routes/Routes";
import { CookiesProvider } from "./providers/CookiesProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 86400 } }, });


//const root = ReactDOM.createRoot(document.querySelector("#root"));

const rootElement = document.querySelector("#root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>

      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </QueryClientProvider>


    </React.StrictMode>

  );
} else {
  console.error('Rood element not found');
}