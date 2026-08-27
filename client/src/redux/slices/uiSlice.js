import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isCartOpen: false,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    toast: null, // { type: 'success' | 'error' | 'info', message: '' }
  },
  reducers: {
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload !== undefined ? action.payload : !state.isCartOpen;
    },
    toggleMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload !== undefined ? action.payload : !state.isMobileMenuOpen;
    },
    toggleSearch: (state, action) => {
      state.isSearchOpen = action.payload !== undefined ? action.payload : !state.isSearchOpen;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    }
  }
});

export const { toggleCart, toggleMobileMenu, toggleSearch, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
