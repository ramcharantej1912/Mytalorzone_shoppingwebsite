class ProductUI {
  static renderProductCard(product) {
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

  static renderProductGrid(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = '<div class="no-products">No products found</div>';
      return;
    }

    container.innerHTML = products.map(this.renderProductCard).join('');
  }

  static renderLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div class="loading">Loading products...</div>';
    }
  }

  static renderError(containerId, message = 'Failed to load products. Please try again later.') {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div class="error">${message}</div>`;
    }
  }
}

export default ProductUI;