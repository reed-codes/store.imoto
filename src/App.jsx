import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { Auth } from "aws-amplify";
import { Amplify } from "@aws-amplify/core";

import { PricelistContextProvider } from "./store/PricelistContext";
import { UserSellerContextProvider } from "./store/UserSellerContext";
import { SellerConfigContextProvider } from "./store/sellerConfigContext";
import { NotificationAndDatabaseContextProvider } from "./store/NotificationAndDatabaseContext";
import { CartWishListContextProvider } from "./store/CartWishlistContext";

import { definePolyfills, scrollTop } from "./utils";
import Routes from "./routes";

// configure the amplify instance.
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USERPOOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_COGNITO_USERPOOL_DOMAIN,
      scope: ["phone", "email", "profile", "openid"],
      redirectSignIn: "https://store-imoto.vercel.app/",
      redirectSignOut: "https://store-imoto.vercel.app/",
      responseType: "token",
    },
  },
});

Auth.configure();

export default function App() {
  definePolyfills();
  scrollTop();
  return (
    <CartWishListContextProvider>
      <UserSellerContextProvider>
        <PricelistContextProvider>
          <SellerConfigContextProvider>
            <NotificationAndDatabaseContextProvider>
              <BrowserRouter basename={"/"}>
                <ScrollContext>
                  <Routes />
                </ScrollContext>
              </BrowserRouter>
            </NotificationAndDatabaseContextProvider>
          </SellerConfigContextProvider>
        </PricelistContextProvider>
      </UserSellerContextProvider>
    </CartWishListContextProvider>
  );
}
