import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MetaMaskProvider } from "./contexts/MetaMaskContext.jsx";
import { router } from './router/index.jsx'
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetaMaskProvider>
    <RouterProvider router={router} />
    </MetaMaskProvider>
  </StrictMode>
);
