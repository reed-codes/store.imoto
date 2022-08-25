import React from "react";
import ReactDOM from "react-dom";
import { Auth } from "aws-amplify";
import { Amplify } from "@aws-amplify/core";
import App from "./App";

import "react-super-treeview/dist/style.css";
import "react-app-polyfill/ie11";

// configure the amplify instance.
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_COGNITO_USERPOOL_DOMAIN,
      scope: ["phone", "email", "profile", "openid"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "token",
    },
  },
});

Auth.configure();

export function Root() {
  return <App />;
}

ReactDOM.render(<Root />, document.getElementById("root"));
