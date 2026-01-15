import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      // Tambahkan slice lain (quiz, materi) di sini nanti
    },
  });
};