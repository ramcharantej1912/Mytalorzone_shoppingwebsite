import { API_CONFIG } from '../config.js';

// Generic API request handler
async function request(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const defaultHeaders = API_CONFIG.HEADERS;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API endpoints
export const api = {
  // Products
  getProducts: () => request('/get-product'),
  
  getProductsByCategory: (category) => request('/product/category', {
    method: 'POST',
    body: JSON.stringify({ category }),
  }),

  getProductById: (productId) => request(`/product/${productId}`),

  // Authentication
  login: (sellerId, emailOrPhone, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ sellerId, emailOrPhone, password }),
  }),

  signup: (phoneNumber, emailId, password) => request('/auth/seller/signup', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber, emailId, password }),
  }),

  logout: (sellerId) => request('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ sellerId }),
  }),

  // Cart
  getCart: (userId) => request(`/cart/${userId}`),

  addToCart: (userId, productId, quantity = 1) => request('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ userId, productId, productQty: quantity }),
  }),

  removeFromCart: (userId, productId) => request('/cart/remove', {
    method: 'POST',
    body: JSON.stringify({ userId, productId }),
  }),

  // Orders
  getOrders: (userId) => request('/find-my-order', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};