import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import CartItem from "./CartItem";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((store) => store.cart);

  return (
    <section className="cart">
      {amount < 1 ? (
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      ) : (
        <>
          <header>
            <h2>Your Bag</h2>
          </header>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total <span>${total}</span>
              </h4>
            </div>
            <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
              clear cart
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default CartContainer;
