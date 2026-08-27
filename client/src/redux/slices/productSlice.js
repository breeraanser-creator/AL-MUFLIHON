import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../services/api';
import { INITIAL_PRODUCTS } from '../../data/mockProducts';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      return await productAPI.getAll(params);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch products');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      return await productAPI.getFeatured();
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch featured products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: INITIAL_PRODUCTS,
    featured: INITIAL_PRODUCTS.filter(p => p.isFeatured),
    newArrivals: INITIAL_PRODUCTS.filter(p => p.isNewArrival),
    bestSellers: INITIAL_PRODUCTS.filter(p => p.isBestSeller),
    currentProduct: null,
    loading: false,
    error: null,
    selectedCategory: 'All',
    searchQuery: '',
    sortBy: 'default'
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.products && action.payload.products.length > 0) {
          state.items = action.payload.products;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        if (action.payload.featured) state.featured = action.payload.featured;
        if (action.payload.newArrivals) state.newArrivals = action.payload.newArrivals;
        if (action.payload.bestSellers) state.bestSellers = action.payload.bestSellers;
      });
  }
});

export const { setCategory, setSearchQuery, setSortBy } = productSlice.actions;
export default productSlice.reducer;
