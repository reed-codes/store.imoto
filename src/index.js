import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "react-super-treeview/dist/style.css";
import "react-app-polyfill/ie11";

export function Root() {
  return <App />;
}

ReactDOM.render(<Root />, document.getElementById("root"));
