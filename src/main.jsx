import React from "react";

import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <AppRoutes />
    </ReactQueryProvider>
  </React.StrictMode>
);
