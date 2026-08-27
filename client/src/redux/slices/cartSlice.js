import { createSlice } from '@reduxjs/toolkit';

const storedCart = localStorage.getItem('almuflihon_cart');
const initialCartItems = storedCart ? JSON.parse(storedCart) : [];

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.qty, 0);
  const shippingPrice = itemsPrice > 10000 || itemsPrice === 0 ? 0 : 250;
  const totalPrice = itemsPrice + shippingPrice;

  return { totalQuantity, itemsPrice, shippingPrice, totalPrice };
};

const initialState = {
  items: initialCartItems,
  ...calculateTotals(initialCartItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find(
        (x) => x._id === item._id && x.selectedSize === item.selectedSize && x.selectedColor === item.selectedColor
      );

      if (existItem) {
        existItem.qty += item.qty || 1;
      } else {
        state.items.push({
          ...item,
          qty: item.qty || 1,
          selectedSize: item.selectedSize || item.sizes?.[0] || 'M',
          selectedColor: item.selectedColor || item.colors?.[0]?.name || 'Plum'
        });
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('almuflihon_cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { _id, selectedSize, selectedColor } = action.payload;
      state.items = state.items.filter(
        (x) => !(x._id === _id && x.selectedSize === selectedSize && x.selectedColor === selectedColor)
      );

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('almuflihon_cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { _id, selectedSize, selectedColor, qty } = action.payload;
      const existItem = state.items.find(
        (x) => x._id === _id && x.selectedSize === selectedSize && x.selectedColor === selectedColor
      );

      if (existItem) {
        existItem.qty = Math.max(1, qty);
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      localStorage.setItem('almuflihon_cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem('almuflihon_cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
