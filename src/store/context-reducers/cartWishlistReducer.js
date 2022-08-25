import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SHOW_CART_MODAL,
  HIDE_CART_MODAL,
  CLEAR_CART,
  DECREMENT_QTY,
  REFRESH_STORE,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
  MOVE_ITEM_FROM_CART_TO_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST_TO_CART,
  INIT_CART_WISHLIST,
  SET_ORDER,
  SET_ORDER_DETAILS,
  SET_DELIVERY_ADDRESS,
  SET_DELIVERY_METHOD,
} from "../../constants/action-types";
import { findCartIndex } from "../../utils/index";

export let initialCartWishlistState = {
  cart:[],
  wishlist:[],
  order: {
    OrderID: "",
    SellerID: "",
    UserID: "",
    AccountID: "",
    CreateDate: "",
    RequiredByDate: "", 
    PaymentMethod: "PAYPAL", 
    PaymentTerms: "PayBefore",
    DeliveryMethod: "",
    PostedToERP: false,
    Type: "ORDER",
    Status: "Ordered",
    Reference: "", 
    Comments: "", 
    Total: 0.0,
    TotalExcl: 0.0,
    TotalTax: 0.0 ,
    Address: {
      Selected: 0, 
      Type: "",
      Address1: "",
      Address2: "",
      Address3: "",
      Address4: "",
      Address5: "",
      Coordinate: { lon: 0, lat: 0 }
    },
    Items: [],
    UserFields: [],
    Tags: [],
  }
}


export const cartWishlistReducer = ( state , action ) => {
  switch (action.type) {
    case INIT_CART_WISHLIST:
      const cartLists = action.lists.cart
      const wishLists = action.lists.wishlist
      return {
        ...state , 
        cart:cartLists,
        wishlist:wishLists,
      };
      
    case ADD_TO_WISHLIST:
      if (!findCartIndex(state.wishlist, action.product.ProductID)) {
        return {
          ...state,
          wishlist: [
            ...state.wishlist,
            {
              ProductID: action.product.ProductID,
              qty: 1,
              productInfo: action.product,
            },
          ],
        };
      }
      return state;

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((product) => {
          return product.ProductID !== action.product.ProductID;
        }),
      };

    case REFRESH_STORE:
      return initialCartWishlistState;

    case ADD_TO_CART:
      if (findCartIndex(state.cart, action.product.ProductID)) {
        const cart = state.cart.reduce((acc, product) => {
          if (product.ProductID === action.product.ProductID) {
            acc.push({
              ...product,
              qty: product.qty + action.qty,
              sum:
                (product.salePrice
                  ? product.salePrice
                  : product.productInfo.Price) *
                (product.qty + product.qty),
            });
          } else {
            acc.push(product);
          }
          return acc;
        }, []);
        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ProductID: action.product.ProductID,
            qty: action.qty,
            productInfo: action.product,
            sum:
              (action.product.salePrice
                ? action.product.salePrice
                : action.product.Price) * action.qty,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.ProductID !== action.product.ProductID
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };

    case DECREMENT_QTY:
      const cart = state.cart.reduce((acc, product) => {
        if (product.ProductID === action.product.ProductID) {
          acc.push({
            ...product,
            qty: product.qty - 1,
            sum:
              (action.product.salePrice
                ? action.product.productInfo.salePrice
                : action.product.productInfo.Price) *
              (product.qty - 1),
          });
        } else {
          acc.push(product);
        }
        return acc;
      }, []);

      return { ...state, cart };

    case MOVE_ITEM_FROM_CART_TO_WISHLIST:
      console.log(action);
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.ProductID !== action.product.ProductID
        ),
        wishlist: [
          ...state.wishlist,
          {
            ProductID: action.product.ProductID,
            qty: 1,
            productInfo: action.product.productInfo,
          },
        ],
      };

    case MOVE_ITEM_FROM_WISHLIST_TO_CART:

      if (findCartIndex(state.cart, action.product.ProductID)) {
        const cart = state.cart.reduce((acc, product) => {
          if (product.ProductID === action.product.ProductID) {
            console.log("about to push here" , product)
            console.log("about to push here" , action.product)
            acc.push({
              ...product,
              qty: product.qty + action.product.qty,
              sum:
                (product.salePrice
                  ? product.salePrice
                  : product.productInfo.Price) *
                (product.qty + product.qty),
            });
          } else {
            acc.push(product);
          }
          return acc;
        }, []);
        return {
          ...state,
          cart,
          wishlist: state.wishlist.filter(
            (item) => item.ProductID !== action.product.ProductID
          ),
        };
      }

      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.ProductID !== action.product.ProductID
        ),
        cart: [
          ...state.cart,
          {
            ProductID: action.product.ProductID,
            qty: 1,
            productInfo: action.product.productInfo,
            sum:
              (action.product.salePrice
                ? action.product.productInfo.salePrice
                : action.product.productInfo.Price) *
              (action.product.qty + action.product.qty),
          },
        ],
      };

    case SHOW_CART_MODAL:
      return {
        ...state,
        showModal: true,
        modalProduct:
          action.product.productInfo === undefined
            ? action.product
            : action.product.productInfo,
      };

    case HIDE_CART_MODAL:
      return {
        ...state,
        showModal: false,
      };

    case SET_DELIVERY_METHOD:
      return {
        ...state,
        order : {
          ...state.order,
          DeliveryMethod: action.payload
        }
      }
    case SET_DELIVERY_ADDRESS:
      return {
        ...state,
        order : {
          ...state.order,
          Address: { ...action.payload}
        }
      }

    case SET_ORDER:
      return {
        ...state,
        order: { ...action.payload }
      }
  
    case SET_ORDER_DETAILS:
      return {
        ...state,
        order : {
          ...state.order,
          RequiredByDate: action.payload.RequiredByDate,
          Comments: action.payload.Comments,
          Reference: action.payload.Reference
        }
      }

    default:
      return state;
  }
};
