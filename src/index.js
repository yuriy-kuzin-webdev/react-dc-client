import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DcContextProvider } from "./contexts/dc-context";

ReactDOM.render(
  <DcContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DcContextProvider>,
  document.getElementById("root")
);
