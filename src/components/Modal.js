import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useIsOutsideClick } from "../hooks/useIsOutsideClick";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  useIsOutsideClick(wrapperRef, () => {
    dispatch(closeModal());
  });

  return (
    <aside className="modal-container">
      <div className="modal" ref={wrapperRef}>
        <h4>Remove all items from your cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            Confirm
          </button>
          <button type="button" className="btn clear-btn" onClick={() => dispatch(closeModal())}>
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
