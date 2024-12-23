// API configuration
const API_BASE_URL = 'http://localhost:5000';

// API utilities
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

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
  },

  // Products
  async getProducts() {
    return this.request('/get-product');
  },

  async getProductsByCategory(category) {
    return this.request('/product/category', {
      method: 'POST',
      body: JSON.stringify({ category }),
    });
  },

  async getProductById(productId) {
    return this.request(`/product/${productId}`);
  },

  // Authentication
  async login(sellerId, emailOrPhone, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ sellerId, emailOrPhone, password }),
    });
  },

  async signup(phoneNumber, emailId, password) {
    return this.request('/auth/seller/signup', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, emailId, password }),
    });
  },

  async logout(sellerId) {
    return this.request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ sellerId }),
    });
  },

  // Cart
  async getCart(userId) {
    return this.request(`/cart/${userId}`);
  },

  async addToCart(userId, productId, quantity = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, productQty: quantity }),
    });
  },

  async removeFromCart(userId, productId) {
    return this.request('/cart/remove', {
      method: 'POST',
      body: JSON.stringify({ userId, productId }),
    });
  },

  // Orders
  async getOrders(userId) {
    return this.request('/find-my-order', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },
};

export default api;