import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MetaMaskProvider } from "./contexts/MetaMaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </StrictMode>
);
