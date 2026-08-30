import axios from 'axios';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

const API_BASE = 'https://al-muflihon-server.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('almuflihon_user');
    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing token from storage:', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback user state in localStorage for smooth mock mode
const getMockUser = () => {
  const data = localStorage.getItem('almuflihon_user');
  return data ? JSON.parse(data) : null;
};

// ================= AUTH APIS =================
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      // Mock Fallback
      if (!error.response) {
        const mockRes = {
          success: true,
          message: 'Registered successfully (Offline Mode)',
          token: 'mock-jwt-token-amf-' + Date.now(),
          user: {
            _id: 'user-mock-' + Date.now(),
            name: userData.name || 'AL-MUFLIHON',
            email: userData.email,
            phone: userData.phone || '03294377954',
            role: 'admin',
            avatar: '/logo.jpg',
            addresses: [
              {
                street: 'AL-MUFLIHON Flagship Store, F-7 Markaz',
                city: 'Islamabad',
                state: 'Federal',
                postalCode: '44000',
                country: 'Pakistan',
                isDefault: true
              }
            ],
            wishlist: []
          }
        };
        localStorage.setItem('almuflihon_user', JSON.stringify(mockRes));
        return mockRes;
      }
      throw error.response?.data || error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Mock Fallback if server connection failed
      if (!error.response) {
        const isAdmin = credentials.email.toLowerCase().includes('admin') || credentials.email.toLowerCase().includes('almuflihon');
        const mockRes = {
          success: true,
          message: 'Logged in successfully! Welcome to AL-MUFLIHON.',
          token: 'mock-jwt-token-amf-' + Date.now(),
          user: {
            _id: 'user-demo-101',
            name: 'AL-MUFLIHON',
            email: credentials.email,
            phone: '03294377954',
            role: isAdmin ? 'admin' : 'user',
            avatar: '/logo.jpg',
            addresses: [
              {
                street: 'AL-MUFLIHON Boutique, F-7 Markaz',
                city: 'Islamabad',
                state: 'Federal',
                postalCode: '44000',
                country: 'Pakistan',
                isDefault: true
              }
            ],
            wishlist: ['prod-001', 'prod-003']
          }
        };
        localStorage.setItem('almuflihon_user', JSON.stringify(mockRes));
        return mockRes;
      }
      throw error.response?.data || error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgotpassword', { email });
      return response.data;
    } catch (error) {
      if (!error.response) {
        const mockToken = 'amf-reset-' + Math.random().toString(36).substring(2, 10);
        return {
          success: true,
          message: 'Password reset link sent successfully! (Demo Token Generated)',
          resetToken: mockToken,
          resetUrl: `/reset-password/${mockToken}`
        };
      }
      throw error.response?.data || error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await api.put(`/auth/resetpassword/${token}`, { password });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return {
          success: true,
          message: 'Password has been reset successfully! You can now log in.',
          token: 'mock-new-token-' + Date.now(),
          user: {
            _id: 'user-demo-101',
            name: 'AL-MUFLIHON Customer',
            email: 'customer@almuflihon.com',
            role: 'user'
          }
        };
      }
      throw error.response?.data || error;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return { success: true, message: 'Password updated successfully (Demo)' };
      }
      throw error.response?.data || error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const local = getMockUser();
      if (local) return { success: true, user: local.user };
      throw error.response?.data || error;
    }
  }
};

// ================= PRODUCT APIS =================
export const productAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      // Filter mock products
      let filtered = [...INITIAL_PRODUCTS];
      if (params.category && params.category !== 'All') {
        filtered = filtered.filter(p => p.category === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (params.sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params.sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (params.sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }
      return {
        success: true,
        products: filtered,
        total: filtered.length,
        pages: 1,
        currentPage: 1
      };
    }
  },

  getFeatured: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      return {
        success: true,
        featured: INITIAL_PRODUCTS.filter(p => p.isFeatured),
        newArrivals: INITIAL_PRODUCTS.filter(p => p.isNewArrival),
        bestSellers: INITIAL_PRODUCTS.filter(p => p.isBestSeller)
      };
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      const prod = INITIAL_PRODUCTS.find(p => p._id === id) || INITIAL_PRODUCTS[0];
      return { success: true, product: prod };
    }
  }
};

// ================= ORDER APIS =================
export const orderAPI = {
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      const mockOrder = {
        _id: 'ord-' + Date.now(),
        ...orderData,
        orderStatus: 'Confirmed',
        trackingNumber: 'AMF-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString()
      };
      
      // Save locally
      const storedOrders = JSON.parse(localStorage.getItem('almuflihon_orders') || '[]');
      storedOrders.unshift(mockOrder);
      localStorage.setItem('almuflihon_orders', JSON.stringify(storedOrders));

      return {
        success: true,
        message: 'Order placed successfully! We are preparing your AL-MUFLIHON garments.',
        order: mockOrder
      };
    }
  },

  getMyOrders: async () => {
    try {
      const response = await api.get('/orders/myorders');
      return response.data;
    } catch (error) {
      const storedOrders = JSON.parse(localStorage.getItem('almuflihon_orders') || '[]');
      if (storedOrders.length === 0) {
        const defaultSampleOrder = {
          _id: 'ord-sample-01',
          orderItems: [
            {
              name: 'Al-Muflihon Imperial Royal Plum Thobe',
              qty: 1,
              price: 7499,
              size: 'L',
              color: 'Imperial Plum',
              image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
            }
          ],
          shippingAddress: {
            fullName: 'Ahmad Khan',
            phone: '+92 300 1234567',
            street: 'House 42, Street 7, F-7/2',
            city: 'Islamabad',
            state: 'Federal',
            postalCode: '44000',
            country: 'Pakistan'
          },
          paymentMethod: 'Cash on Delivery',
          itemsPrice: 7499,
          shippingPrice: 200,
          totalPrice: 7699,
          orderStatus: 'Processing',
          trackingNumber: 'AMF-829104',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        };
        storedOrders.push(defaultSampleOrder);
        localStorage.setItem('almuflihon_orders', JSON.stringify(storedOrders));
      }
      return { success: true, count: storedOrders.length, orders: storedOrders };
    }
  }
};

// ================= USER APIS =================
export const userAPI = {
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      const stored = getMockUser();
      if (stored) {
        stored.user = { ...stored.user, ...profileData };
        localStorage.setItem('almuflihon_user', JSON.stringify(stored));
        return { success: true, message: 'Profile updated successfully', user: stored.user };
      }
      throw error.response?.data || error;
    }
  }
};

export default api;
