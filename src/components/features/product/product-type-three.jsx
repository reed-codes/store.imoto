import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { addToCart, addToWishList, showQuickView } from "../../../action";
import { findIndex , findCartIndex } from "../../../utils";

import { CartListContext } from "../../../store/CartListContext";
import { WishlistContext } from "../../../store/WishlistContext";
import { PricelistContext } from "../../../store/PricelistContext";
import { CartWishListContext } from "../../../store/CartWishlistContext";

function ProductTypeThree(props) {
  const { cartWishList,
    cartWishListDispach } = useContext(CartWishListContext);
  const { pricelistDispach } = useContext(PricelistContext);
  
  let isInWishlist = props.product ? findCartIndex(cartWishList.wishlist, props.product.ProductID) ? true : false : false;

  let { addClass, product } = props;

  const onWishlistClick = (e) => {
    if (!isInWishlist) {
      e.preventDefault();
      cartWishListDispach(addToWishList(product));
    }
  };

  return (
    <div className={`product-default ${addClass}`}>
      <figure className="col-md-3 col-sm-4 p-0">
        <Link to={`${process.env.PUBLIC_URL}/products/default/${product.ProductID}`}>
          <img
            src={product.ImageURL[0]}
            className="first-image"
            alt="product"
          />

          {product.ImageURL[1] ? (
            <img
              src={product.ImageURL[0]}
              className="last-image"
              alt="product"
            />
          ) : (
            ""
          )}
        </Link>
      </figure>

      <div className="product-details col-md-9 col-sm-8">
        <h2 className="product-title">
          <Link to={`${process.env.PUBLIC_URL}/products/default/${product.ProductID}`}>
            {product.Description}
          </Link>
        </h2>
        <div className="ratings-container">
          <div className="product-ratings">
            <span
              className="ratings"
              style={{ width: 20 * product.Ranking + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {product.Ranking.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="product-description">{product.LongDescription}</p>
        <div className="product-action">
          <button
            className="btn-icon btn-add-cart"
            onClick={() => addToCart( product, 1, cartWishListDispach )}
          >
            <i className="icon-bag"></i>ADD TO CART
          </button>

          <Link
            to={`${process.env.PUBLIC_URL}/pages/wishlist`}
            className={`btn-icon-wish ${isInWishlist ? "checked" : ""}`}
            onClick={onWishlistClick}
          >
            <i className="icon-heart"></i>
          </Link>

          <Link
            to="#"
            className="btn-quickview"
            title="Quick View"
            onClick={(e) => {
              e.preventDefault();
              pricelistDispach( showQuickView(product) );
            }}
          >
            <i className="fas fa-external-link-alt"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductTypeThree;
