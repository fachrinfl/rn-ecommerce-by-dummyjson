import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../api/types/product';

const initialState: Product[] = [];

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addSaved: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    deleteSaved: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(product => product.sku === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {addSaved, deleteSaved} = savedSlice.actions;

export default savedSlice.reducer;
