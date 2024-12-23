import { api } from '../utils/api.js';
import { setUser, removeUser } from '../utils/auth.js';

class AuthService {
  async login(sellerId, emailOrPhone, password) {
    try {
      const response = await api.login(sellerId, emailOrPhone, password);
      if (response.success) {
        const user = {
          sellerId: response.sellerId,
          emailOrPhone,
        };
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async signup(phoneNumber, emailId, password) {
    try {
      const response = await api.signup(phoneNumber, emailId, password);
      if (response.sellerId) {
        const user = {
          sellerId: response.sellerId,
          emailId,
          phoneNumber,
        };
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  async logout() {
    const user = getUser();
    if (user) {
      try {
        await api.logout(user.sellerId);
        removeUser();
        return true;
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    }
    return true;
  }
}

export default new AuthService();