import React, { createContext, useReducer, useEffect } from "react";
import { cartReducer, initialCartState } from "./context-reducers/cartReducer";
import {
  initialCartWishlistState,
  cartWishlistReducer,
} from "./context-reducers/cartWishlistReducer";
import {
  HIDE_QUICKVIEW,
  HIDE_CART_MODAL,
  INIT_WISHLIST,
  INIT_CART_WISHLIST,
} from "../constants/action-types";
import { initCartWishList, initWishList } from "../action";

export const CartWishListContext = createContext({
  cart: [],
  wishlist: [],
});

export const CartWishListContextProvider = ({ children }) => {
  const [cartWishList, cartWishListDispach] = useReducer(
    cartWishlistReducer,
    initialCartWishlistState
  );
  const [cart, setCart] = React.useState();

  const getLists = async () => {
    // const response = await fetch("https://fakestoreapi.com/carts");
    // const results = await response.json();
    // console.log(results);
    const cartAction = {
      // type: INIT_CART_WISHLIST,
      cart: [
        {
          ProductID: "3cfef655-f51d-45d2-a922-e0f012139348",
          qty: 1,
          productInfo: {
            SellerID: "74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            Pricelist: "1",
            ProductID: "3cfef655-f51d-45d2-a922-e0f012139348",
            Description: "Prodigy Demo Keyboard 10",
            Tax: 0,
            Price: 720,
            Stock: 433,
            UOM: "",
            Brand: "Prodigy",
            CategoryID: "Wireless",
            Tags: ["Cherry"],
            Ranking: 1,
            LongDescription:
              "The Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features. With an improved scissor mechanism beneath each key for increased stability, as well as optimized key travel and a lower profile, the Magic Keyboard provides a remarkably comfortable and precise typing experience. It pairs automatically with your Mac, so you can get to work right away.\n",
            ImageURL: [
              "https://daseuropeanautohaus.com/wp-content/uploads/2018/07/Car-O2-Sensor.jpg",
            ],
            PartitionKey: "74f7e0ce-b669-405e-ba92-3e97e5b4505d|1",
            CatalogueID: "test",
            CategoryIDSellerID: "test|74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            ParentCategories: ["1", "Hardware", "Keyboard"],
            IsDeleted: 0,
            SliderID: "5b7a44fe-805a-415d-a439-806383931a65",
          },
          sum: 720,
        },
        {
          ProductID: "b6304826-b744-47bd-af79-da8302a7fd23",
          qty: 1,
          productInfo: {
            SellerID: "74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            Pricelist: "1",
            ProductID: "b6304826-b744-47bd-af79-da8302a7fd23",
            Description: "ROCCAT Demo Keyboard 43",
            Tax: 0,
            Price: 1094,
            Stock: 433,
            UOM: "",
            Brand: "ROCCAT",
            CategoryID: "Mechanical",
            Tags: ["Numeric", "RGB"],
            Ranking: 1,
            LongDescription:
              "The Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features. With an improved scissor mechanism beneath each key for increased stability, as well as optimized key travel and a lower profile, the Magic Keyboard provides a remarkably comfortable and precise typing experience. It pairs automatically with your Mac, so you can get to work right away.\n",
            ImageURL: [
              "https://daseuropeanautohaus.com/wp-content/uploads/2018/07/Car-O2-Sensor.jpg",
            ],
            PartitionKey: "74f7e0ce-b669-405e-ba92-3e97e5b4505d|1",
            CatalogueID: "test",
            CategoryIDSellerID: "test|74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            ParentCategories: ["1", "Hardware", "Keyboard"],
            IsDeleted: 0,
            SliderID: "cd90ea61-4147-4b92-a659-531a03c82859",
          },
          sum: 1094,
        },
        {
          ProductID: "2.58017187e8",
          qty: 1,
          productInfo: {
            SellerID: "74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            Pricelist: "1",
            ProductID: "2.58017187e8",
            Description: "G413 Logitec",
            Tax: 0,
            Price: 2350,
            Stock: 0,
            UOM: "",
            Brand: "Logitec",
            CategoryID: "G21",
            Tags: ["Numeric", "Cherry", "RGB"],
            Ranking: 0,
            LongDescription:
              "G413 was thoughtfully conceived, designed and engineered to deliver advanced performance with just the right feature set. Lightweight, high-strength 5052 aluminum alloy top case enables the slim, bladelike chassis. Underneath find mouse and headset cable management, plus adjustable-height feet with rubber stabilizers, for confidence during intense gameplay. The Romer-G mechanical switch is purpose-built for pro-grade performance, responsiveness and durability.",
            ImageURL: [
              "https://daseuropeanautohaus.com/wp-content/uploads/2018/07/Car-O2-Sensor.jpg",
            ],
            PartitionKey: "74f7e0ce-b669-405e-ba92-3e97e5b4505d|1",
            CategoryIDSellerID: "|74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            ParentCategories: ["1", "Hardware", "Keyboard", "Wired"],
            IsDeleted: 0,
            SliderID: "707052b0-147d-41a8-8b45-0956b927ff7c",
          },
          sum: 2350,
        },
        {
          ProductID: "d9db1177-bd80-453b-967c-1b4083aee2c7",
          qty: 1,
          productInfo: {
            SellerID: "74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            Pricelist: "1",
            ProductID: "d9db1177-bd80-453b-967c-1b4083aee2c7",
            Description: "Asus Demo Keyboard 4",
            Tax: 0,
            Price: 253,
            Stock: 433,
            UOM: "",
            Brand: "Asus",
            CategoryID: "Wireless",
            Tags: ["RGB"],
            Ranking: 1,
            LongDescription:
              "The Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features. With an improved scissor mechanism beneath each key for increased stability, as well as optimized key travel and a lower profile, the Magic Keyboard provides a remarkably comfortable and precise typing experience. It pairs automatically with your Mac, so you can get to work right away.\n",
            ImageURL: [
              "https://daseuropeanautohaus.com/wp-content/uploads/2018/07/Car-O2-Sensor.jpg",
            ],
            PartitionKey: "74f7e0ce-b669-405e-ba92-3e97e5b4505d|1",
            CatalogueID: "test",
            CategoryIDSellerID: "test|74f7e0ce-b669-405e-ba92-3e97e5b4505d",
            ParentCategories: ["1", "Hardware", "Keyboard"],
            IsDeleted: 0,
            SliderID: "45b2b928-13f2-4375-b917-be7facfdc32d",
          },
          sum: 253,
        },
      ],
      wishlist:[
        
      ]
    } 
    initCartWishList(cartAction, cartWishListDispach);
  };
  // useEffect(()=>{
  //   initWishList("")
  //   fetch lists from api
  //   pass them down to the reducer as the payload
  //   ...

  //   cartWishListDispach({type: INIT_WISHLIST})
  // },[])

  useEffect(() => {
    localStorage.setItem("cartWishlist", JSON.stringify(cartWishList));
  }, [cartWishList]);

  useEffect(() => {
    getLists();
    
    cartWishListDispach({ type: HIDE_CART_MODAL });
    cartWishListDispach({ type: HIDE_QUICKVIEW });
  }, []);

  return (
    <CartWishListContext.Provider
      value={{
        cartWishList,
        cartWishListDispach,
      }}
    >
      {children}
    </CartWishListContext.Provider>
  );
};
