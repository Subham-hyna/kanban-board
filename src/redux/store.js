import { configureStore } from '@reduxjs/toolkit';
import groupSlice from './reducers/groupingReducer'

const store = configureStore({
    reducer: {
        group : groupSlice
    },
  });
  
  export default store;

  export const server = "https://api.quicksell.co/v1/internal/frontend-assignment ";
