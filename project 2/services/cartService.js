import { api } from '../utils/api.js';
import { getUser } from '../utils/auth.js';

class CartService {
  constructor() {
    this.items = [];
    this.loadCart();
  }

  async loadCart() {
    const user = getUser();
    if (user?.sellerId) {
      try {
        const response = await api.getCart(user.sellerId);
        this.items = response.items || [];
        this.updateUI();
        return true;
      } catch (error) {
        console.error('Failed to load cart:', error);
        return false;
      }
    }
    return false;
  }

  async addItem(productId, quantity = 1) {
    const user = getUser();
    if (!user?.sellerId) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await api.addToCart(user.sellerId, productId, quantity);
      await this.loadCart();
      return true;
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  }

  async removeItem(productId) {
    const user = getUser();
    if (!user?.sellerId) {
      throw new Error('User not logged in');
    }

    try {
      await api.removeFromCart(user.sellerId, productId);
      await this.loadCart();
      return true;
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    }
  }

  updateUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.items.reduce((total, item) => total + (item.quantity || 0), 0);
    }
  }
}

export default new CartService();