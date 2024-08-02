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
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    deleteCart(state, action: PayloadAction<number>) {
      const index = state.findIndex(product => product.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    decrementCartQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.find(
        product => product.id === action.payload,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) - 1;
        if (existingProduct.quantity <= 0) {
          const index = state.findIndex(
            product => product.id === action.payload,
          );
          if (index !== -1) {
            state.splice(index, 1);
          }
        }
      }
    },
  },
});

export const {addCart, deleteCart, decrementCartQuantity} = cartSlice.actions;

export default cartSlice.reducer;
