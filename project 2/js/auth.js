import api from './api.js';

class Auth {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')) || null;
    this.updateAuthUI();
  }

  async login(sellerId, emailOrPhone, password) {
    try {
      const response = await api.login(sellerId, emailOrPhone, password);
      if (response.success) {
        this.user = {
          sellerId: response.sellerId,
          emailOrPhone,
        };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateAuthUI();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async signup(phoneNumber, emailId, password) {
    try {
      const response = await api.signup(phoneNumber, emailId, password);
      if (response.sellerId) {
        this.user = {
          sellerId: response.sellerId,
          emailId,
          phoneNumber,
        };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateAuthUI();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  }

  async logout() {
    if (this.user) {
      try {
        await api.logout(this.user.sellerId);
        localStorage.removeItem('user');
        this.user = null;
        this.updateAuthUI();
        return true;
      } catch (error) {
        console.error('Logout failed:', error);
        return false;
      }
    }
    return true;
  }

  updateAuthUI() {
    const authLinks = document.querySelector('.auth-links');
    if (!authLinks) return;

    if (this.user) {
      authLinks.innerHTML = `
        <button id="logoutBtn">Logout</button>
        <a href="/account.html">My Account</a>
      `;
      document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    } else {
      authLinks.innerHTML = `
        <a href="/login.html">Login</a>
        <a href="/signup.html">Sign Up</a>
      `;
    }
  }

  isAuthenticated() {
    return !!this.user;
  }

  getCurrentUser() {
    return this.user;
  }
}

export default new Auth();