import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },

  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },

    setUser(userData) {
      this.user = userData;
    },

    async login(email, password) {
      try {
        const { data } = await api.post('/auth/login', { email, password });
        this.setToken(data.data.token);
        this.setUser(data.data);
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert(error.response?.data?.error?.message || 'Login error');
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },

    checkToken() {
      if (!this.token) return;

      try {
        const decoded = jwtDecode(this.token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          this.logout();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        this.logout();
      }
    }
  }
});
