import { api } from '../utils/api.js';

class ProductService {
  constructor() {
    this.products = [];
    this.categories = new Set();
  }

  async loadProducts() {
    try {
      const response = await api.getProducts();
      if (response.success) {
        this.products = response.products;
        this.categories = new Set(this.products.map(p => p.category));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load products:', error);
      return false;
    }
  }

  async getProductsByCategory(category) {
    try {
      const response = await api.getProductsByCategory(category);
      return response.success ? response.products : [];
    } catch (error) {
      console.error('Failed to load products by category:', error);
      return [];
    }
  }

  async getProductDetails(productId) {
    try {
      const response = await api.getProductById(productId);
      return response.success ? response.product : null;
    } catch (error) {
      console.error('Failed to get product details:', error);
      return null;
    }
  }
}

export default new ProductService();