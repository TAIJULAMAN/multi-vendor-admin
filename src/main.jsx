import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import ReduxProvider from "./Redux/ReduxProvider";
import { UserProvider } from "./context/userContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <UserProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </UserProvider>
    </ReduxProvider>
  </StrictMode>
);
