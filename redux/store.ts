import { configureStore } from '@reduxjs/toolkit';
import navbarMenuReducer from './features/navbarMenuSlice';

export const store = configureStore({
  reducer: {
    navbarMenu: navbarMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
