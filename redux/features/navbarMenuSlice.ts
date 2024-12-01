import { NavbarMenu } from '@/interfaces/navbarMenu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarMenuState {
  id: string | null;
  action: NavbarMenu | null;
  menuList: NavbarMenu[] | null;
  formattedMenuList: NavbarMenu[] | null;
}

const initialState: NavbarMenuState = {
  id: null,
  action: null,
  menuList: null,
  formattedMenuList: null,
};

const navbarMenuSlice = createSlice({
  name: 'navbarMenu',
  initialState,
  reducers: {
    setFormattedMenuData(state, action: PayloadAction<{ id: string; action: NavbarMenu }>) {
      state.id = action.payload.id;
      state.action = action.payload.action;
    },
    clearFormattedMenuData(state) {
      state.id = null;
      state.action = null;
    },
    setFetchedMenuData(state, action: PayloadAction<NavbarMenu[]>) {
      state.menuList = action.payload;      
    },
    setFormattedMenuList(state, action: PayloadAction<any[]>) {
      state.formattedMenuList = action.payload;
    },
  },
});

export const { setFormattedMenuData, clearFormattedMenuData, setFetchedMenuData, setFormattedMenuList } = navbarMenuSlice.actions;
export default navbarMenuSlice.reducer;
