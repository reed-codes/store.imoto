import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { findIndex , findCartIndex } from "../../../utils";
import { addToCart, addToWishList, showQuickView } from "../../../action";

import { CartListContext } from "../../../store/CartListContext";
import { WishlistContext } from "../../../store/WishlistContext";
import { PricelistContext } from "../../../store/PricelistContext";
import { CartWishListContext } from "../../../store/CartWishlistContext";

function ProductTypeTwo(props) {
  const { cartWishList,
    cartWishListDispach } = useContext(CartWishListContext);
  const { pricelistDispach } = useContext(PricelistContext);
  let isInWishlist = props.product ? findCartIndex(cartWishList.wishlist, props.product.ProductID) ? true : false : false;

  let { addClass, product } = props;
  let hasWishIcon = true;

  const onWishlistClick = (e) => {
    if (!isInWishlist) {
      e.preventDefault();
      cartWishListDispach(addToWishList(product));
    }
  };

  return (
    <div className={`product-default ${addClass}`}>
      <figure>
        <Link
          to={`${process.env.PUBLIC_URL}/products/default/${product.ProductID}`}
        >
          <span>
            <img
              src={
                product.ImageURL[0]
              }
              className="first-image"
              alt="product"
            />
          </span>
          {product.ImageURL[0] ? (
            <span className="product-image-hover">
              <img
                src={
                  product.ImageURL[0]
                }
                className="last-image"
                alt="product"
              />
            </span>
          ) : (
            ""
          )}
        </Link>

        <div className="btn-icon-group">
          <button
            className="btn-icon btn-add-cart"
            data-toggle="modal"
            data-target="#addCartModal"
            onClick={() => addToCart(product, 1, cartWishListDispach)}
            title="Add to Cart"
          >
            <i className="icon-bag"></i>
          </button>
        </div>
        <Link
          to="#"
          className="btn-quickview"
          title="Quick View"
          onClick={(e) => {
            e.preventDefault();
            pricelistDispach(showQuickView(product));
          }}
        >
          Quick View
        </Link>
      </figure>

      <div className="product-details">
        <div className="category-wrap">
          <Link
            to={`${process.env.PUBLIC_URL}/categories/full-width`}
            className="product-category"
          >
            {product.CategoryID}
          </Link>

          <Link
            to={`${process.env.PUBLIC_URL}/pages/wishlist`}
            className={`btn-icon-wish ${isInWishlist ? "checked" : ""} ${
              hasWishIcon ? "" : "d-none"
            }`}
            onClick={onWishlistClick}
            title={`${isInWishlist ? "Go to Wishlist" : "Add to Wishlist"}`}
          >
            <i className="icon-heart"></i>
          </Link>
        </div>

        <h3 className="product-title">
          <Link
            to={`${process.env.PUBLIC_URL}/products/default/${product.ProductID}`}
          >
            {product.Description}
          </Link>
        </h3>

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
          <div className="price-box">
            <span className="product-price">${product.Price.toFixed(2)}</span>
          </div>
      </div>
    </div>
  );
}

export default ProductTypeTwo;
