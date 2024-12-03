import { configureStore } from '@reduxjs/toolkit';
import workerReducer from './workerReducer';
const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
