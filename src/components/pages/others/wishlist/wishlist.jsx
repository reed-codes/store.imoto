import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Breadcrumb from "../../../common/breadcrumb";
import withAuthCheck from "../../../hoc/withAuthCheck";

import {
  removeFromWishlist,
  showQuickView,
  moveFromWishlistToCart,
  clearWishlist,
} from "../../../../action";

import { WishlistContext } from "../../../../store/WishlistContext";
import { PricelistContext } from "../../../../store/PricelistContext";
import { CartWishListContext } from "../../../../store/CartWishlistContext";

function Wishlist(props) {
  // const { wishlist, wishlistDispach } = useContext(WishlistContext);
  const { cartWishList, cartWishListDispach } = useContext(CartWishListContext);
  const { pricelistDispach } = useContext(PricelistContext);

  function moveToCart(e, item) {
    e.preventDefault();
    moveFromWishlistToCart(item, cartWishListDispach);
  }

  function removeWishlist(e, item) {
    e.preventDefault();
    removeFromWishlist(item, cartWishListDispach);
  }
  const handleClearWishlist = (e) => {
    e.preventDefault();
    clearWishlist(cartWishListDispach);
  };

  return (
    <>
      <Helmet>
        <title>Porto React Ecommerce - Wishlist Page </title>
      </Helmet>

      <h1 className="d-none">Porto React Ecommerce - Wishlist Page</h1>

      <div className="main">
        <Breadcrumb current="Wishlist" parent="pages" />

        <div className="container">
          {cartWishList.wishlist.length === 0 ? (
            <div className="align-left mt-3">
              <div className="wishlist-title ">
                <h2>My wishlist on Porto Store</h2>
              </div>

              <div className="box-content">
                <table
                  className="table-wishlist"
                  data-pagination="no"
                  data-per-page="5"
                  data-page="1"
                  data-id=""
                  data-token=""
                >
                  <thead className="d-none">
                    <tr>
                      <th className="product-thumbnail"></th>

                      <th className="product-name">
                        <span className="nobr">Product</span>
                      </th>

                      <th className="product-price">
                        <span className="nobr">price</span>
                      </th>

                      <th className="product-stock-status">
                        <span className="nobr">Stock status</span>
                      </th>

                      <th className="product-add-to-cart">
                        <span className="nobr">Actions</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="wishlist-items-wrapper">
                    <tr className="border-0 py-0">
                      <td colSpan="6" className="px-3 py-2 text-center">
                        <i className="far fa-heart wishlist-empty"></i>
                      </td>
                    </tr>
                    <tr className="border-0 py-0">
                      <td colSpan="6" className="px-3 py-2 wishlist-empty">
                        No products added to the wishlist
                      </td>
                    </tr>
                    <tr className="border-0 py-0">
                      <td colSpan="6" className="px-3 text-center">
                        <Link
                          className="btn btn-go-shop"
                          to={`${process.env.PUBLIC_URL}/categories/full-width`}
                        >
                          GO SHOP
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="wishlist-table-container">
                <table className="table table-order table-wishlist">
                  <thead>
                    <tr>
                      <th className="product-thumbnail"></th>
                      <th className="product-name">Product Name</th>
                      <th className="product-unit-price">Unit Price</th>
                      <th className="product-stock-status">Stock Status</th>
                      <th className="product-action"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartWishList.wishlist.map((item, index) => (
                      <React.Fragment key={"wishlist-item" + index}>
                        <tr>
                          <td className="product-thumbnail">
                            <figure className="position-relative mr-auto ml-auto">
                              <Link
                                to={`${process.env.PUBLIC_URL}/products/default/${item.ProductID}`}
                              >
                                <img
                                  style={{ objectFit: "cover" }}
                                  src={item.productInfo.ImageURL[0]}
                                  alt="product"
                                />
                              </Link>

                              <Link
                                to="#"
                                onClick={(e) => removeWishlist(e, item)}
                                className="remove remove-from-wishlist"
                              >
                                <i className="icon-cancel"></i>
                              </Link>
                            </figure>
                          </td>
                          <td className="product-title">
                            <Link
                              to={`${process.env.PUBLIC_URL}/products/default/${item.ProductID}`}
                            >
                              {item.productInfo.Description}
                            </Link>
                          </td>

                          <td className="price-box">
                            <span className="product-price">
                              ${item.productInfo.Price.toFixed(2)}
                            </span>
                          </td>

                          <td className="product-stock-status">
                            <span className="stock-status">
                              {item.productInfo.Stock > 10
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </td>
                          <td className="product-action">
                            <button
                              className="btn btn-add-cart"
                              onClick={(e) => moveToCart(e, item)}
                            >
                              <span>Add to Cart</span>
                            </button>
                            <Link
                              to="#"
                              className="btn btn-quickview"
                              title="Quick View"
                              onClick={(e) => {
                                e.preventDefault();
                                pricelistDispach(
                                  showQuickView(item.productInfo)
                                );
                              }}
                            >
                              <i className="fas fa-external-link-alt"></i>
                              <span>Quick View</span>
                            </Link>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                <div
                  className="float-right"
                  style={{
                    marginTop: "24px",
                  }}
                >
                  <Link
                    to="#"
                    className="btn btn-outline-secondary btn-clear-cart"
                    onClick={handleClearWishlist}
                  >
                    Clear Wishlist
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="mb-2"></div>
        </div>

        <div className="mb-6"></div>
      </div>
    </>
  );
}

export default withAuthCheck(Wishlist);
