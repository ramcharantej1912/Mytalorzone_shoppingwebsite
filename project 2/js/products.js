import api from './api.js';

class ProductManager {
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

  async loadProductsByCategory(category) {
    try {
      const response = await api.getProductsByCategory(category);
      if (response.success) {
        return response.products;
      }
      return [];
    } catch (error) {
      console.error('Failed to load products by category:', error);
      return [];
    }
  }

  async getProductDetails(productId) {
    try {
      const response = await api.getProductById(productId);
      if (response.success) {
        return response.product;
      }
      return null;
    } catch (error) {
      console.error('Failed to get product details:', error);
      return null;
    }
  }

  renderProductCard(product) {
    return `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price}</p>
          <div class="product-actions">
            <button class="add-to-cart" data-product-id="${product.productId}">
              Add to Cart
            </button>
            <a href="/product.html?id=${product.productId}" class="view-details">
              View Details
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderProductGrid(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(p => this.renderProductCard(p)).join('');
    
    // Add event listeners for add to cart buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', async (e) => {
        const productId = e.target.dataset.productId;
        await cart.addItem(productId);
      });
    });
  }
}

export default new ProductManager();
