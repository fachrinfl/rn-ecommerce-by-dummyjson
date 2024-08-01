import {configureStore} from '@reduxjs/toolkit';
import savedReducer from './savedSlice';

export const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
