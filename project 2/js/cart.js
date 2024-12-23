import api from './api.js';

class CartManager {
  constructor() {
    this.items = [];
    this.loadCart();
    this.initializeUI();
  }

  initializeUI() {
    // Only try to update UI if cart count element exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      this.updateCartCount();
    }

    // Add event delegation for add to cart buttons
    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.dataset.productId;
        await this.addItem(productId);
      }
    });
  }

  async loadCart() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.sellerId) {
      try {
        const response = await api.getCart(user.sellerId);
        this.items = response.items || [];
        this.updateCartCount();
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.items.reduce((total, item) => total + (item.quantity || 0), 0);
    }
  }

  async addItem(productId, quantity = 1) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.sellerId) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      await api.addToCart(user.sellerId, productId, quantity);
      await this.loadCart(); // Reload cart to get updated items
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert('Failed to add item to cart');
    }
  }

  async removeItem(productId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.sellerId) return;

    try {
      await api.removeFromCart(user.sellerId, productId);
      await this.loadCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }
}

export default new CartManager();