import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../../actions/cartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // function to remove item from the cart
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // function to increase quantity of an item in cart
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  // function to decrease quantity of an item in cart
  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(updateCartQuantity(id, newQty));
    }
  };

  // function to navigate to the delivery page
  const checkoutHandler = () => {
    navigate("/delivery");
  };

  return (
    <>
      {/*Conditonal rendering based on cartItems*/}
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is empty</h2>
      ) : (
        <>
          {/*Display the number of items in the cart*/}
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
            {/*some changes needed */}
          </h2>

          {/* Cart Items*/}
          <div className="row d-flex justify-content-between cartt">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" key={item.fooditem}>
                    <div className="row">
                      {/*Display Item Image */}
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="items"
                          width="115"
                          height="90"
                        ></img>
                      </div>

                      {/* Display item name */}
                      <div className="col-5 col-lg-3">{item.name}</div>

                      {/* Display item price */}
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">
                          <FontAwesomeIcon icon={faIndianRupee} size="xs " />
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity Controls  */}
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          {/* Decrease Quantity button */}
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.fooditem, item.quantity)
                            }
                          >
                            -
                          </span>

                          {/* Display current quantity */}
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          {/* Increase Quantity button */}
                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.fooditem,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.fooditem)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* Order summary */}
            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />

                {/* Display Subtotal */}
                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}
                    (Units)
                  </span>
                </p>

                {/* Display total */}
                <p>
                  Total:
                  <span className="order-summary-values">
                    <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      ).toFixed(2)}
                  </span>
                </p>
                <hr/>
                {/* Checkout button  */}
                <button id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={checkoutHandler}>
                  Checkout
                </button>
              </div> 
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
