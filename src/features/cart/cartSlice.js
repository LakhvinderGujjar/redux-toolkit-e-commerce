import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openModal } from "../modal/modalSlice";

const URL = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (randomParam, thunkAPI) => {
  try {
    // console.log(randomParam);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const resp = await axios(URL);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload: itemId }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseItemAmount: (state, { payload: itemId }) => {
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount++;
    },
    decreaseItemAmount: (state, { payload: itemId }) => {
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      if (cartItem.amount > 1) cartItem.amount--;
    },
    calculateTotal: (state) => {
      let amount = 0,
        total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.amount = amount;
      state.total = parseFloat(total).toFixed(2);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, { payload }) => {
      state.cartItems = payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state, { payload }) => {
      console.log("Rejected with payload:", payload);
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increaseItemAmount, decreaseItemAmount, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
