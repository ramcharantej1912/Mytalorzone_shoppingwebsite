// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if navbar exists
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Insert navbar content if it's empty
  if (!navbar.querySelector('.nav-container')) {
    navbar.innerHTML = `
      <div class="nav-container">
        <div class="brand">
          <h1>Mytalorzone</h1>
          <p>By Sahiba</p>
        </div>
        
        <ul class="nav-links">
          <li><a href="/" class="active">Home</a></li>
          <li><a href="/shop.html">Shop</a></li>
          <li><a href="/collections.html">Collections</a></li>
          <li><a href="/about.html">About</a></li>
        </ul>

        <div class="nav-icons">
          <button id="searchBtn"><i class="fas fa-search"></i></button>
          <a href="/account.html"><i class="fas fa-user"></i></a>
          <a href="/cart.html" class="cart-icon">
            <i class="fas fa-shopping-bag"></i>
            <span class="cart-count">0</span>
          </a>
          <button class="menu-toggle" id="menuToggle">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    `;
  }

  // Initialize mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
      }
    });
  }

  // Initialize search
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // Implement search functionality
      console.log('Search clicked');
    });
  }
});