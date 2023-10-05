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
            Your Cart: <b>{cartItems.length} items</b> {/*some changes needed */}
          </h2>

          {/* Cart Items*/ }
          <div className="cart-item" key={item.fooditem}>
            <div className="row">
              {/**Display Item Image */}
              <div className="col-4 col-lg-3">
                <img src={item.image} alt="items" width="115" height="90"></img>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
