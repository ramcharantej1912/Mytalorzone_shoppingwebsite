import productService from '../services/productService.js';
import cartService from '../services/cartService.js';
import ProductUI from '../ui/productUI.js';

async function initShopPage() {
  const productGrid = document.getElementById('productGrid');
  const categorySelect = document.getElementById('category');

  try {
    ProductUI.renderLoading('productGrid');
    
    // Load initial products
    await productService.loadProducts();
    ProductUI.renderProductGrid(productService.products, 'productGrid');

    // Setup category filter
    if (categorySelect) {
      productService.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });

      categorySelect.addEventListener('change', async (e) => {
        const category = e.target.value;
        ProductUI.renderLoading('productGrid');
        
        const products = category
          ? await productService.getProductsByCategory(category)
          : productService.products;
          
        ProductUI.renderProductGrid(products, 'productGrid');
      });
    }

    // Setup add to cart handlers
    if (productGrid) {
      productGrid.addEventListener('click', async (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          try {
            const productId = e.target.dataset.productId;
            await cartService.addItem(productId);
            alert('Product added to cart');
          } catch (error) {
            alert(error.message);
          }
        }
      });
    }
  } catch (error) {
    console.error('Failed to initialize shop page:', error);
    ProductUI.renderError('productGrid');
  }
}

document.addEventListener('DOMContentLoaded', initShopPage);