import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../api/types/product';

const initialState: Product[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.find(
        product => product.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity =
          (existingProduct.quantity || 0) + (action.payload.quantity || 1);
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    deleteCart(state, action: PayloadAction<number>) {
      state = state.filter(product => product.id !== action.payload);
    },
    decrementCartQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.find(
        product => product.id === action.payload,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) - 1;
        if (existingProduct.quantity <= 0) {
          state = state.filter(product => product.id !== action.payload);
        }
      }
    },
  },
});

export const {addCart, deleteCart} = cartSlice.actions;

export default cartSlice.reducer;
