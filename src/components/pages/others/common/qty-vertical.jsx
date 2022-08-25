import React, { useEffect, useContext } from "react";

import { incrementQty, decrementQty } from "../../../../action";

import { CartListContext } from "../../../../store/CartListContext";
import { CartWishListContext } from "../../../../store/CartWishlistContext";

function QtyVertical(props) {
  // const { cartWishListDispach } = useContext(CartListContext);
  const {  cartWishList,
    cartWishListDispach } = useContext(CartWishListContext);

  useEffect(() => {
    document.querySelector(`#${props.id} input`) &&
      (document.querySelector(`#${props.id} input`).value = props.product.qty);
  });

  function countUp(e) {
    cartWishListDispach(incrementQty(props.product));
  }

  function countDown(e) {
    if (props.product.qty > 1) {
      cartWishListDispach(decrementQty(props.product));
    }
  }

  return (
    <div
      className="input-group  bootstrap-touchspin bootstrap-touchspin-injected"
      id={props.id}
    >
      <input
        className="vertical-quantity form-control"
        type="text"
        defaultValue={props.product.qty}
      />
      <span className="input-group-btn-vertical">
        <button
          className="btn btn-outline bootstrap-touchspin-up icon-up-dir"
          onClick={countUp}
          type="button"
        ></button>
        <button
          className="btn btn-outline bootstrap-touchspin-down icon-down-dir"
          onClick={countDown}
          type="button"
        ></button>
      </span>
    </div>
  );
}

export default QtyVertical;
