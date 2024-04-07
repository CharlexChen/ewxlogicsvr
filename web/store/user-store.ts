import { defineStore } from 'pinia';
import {
  login as userLogin,
  getUserInfo,
  LoginReq,
} from '@/api/user';
import { clearToken, setToken } from '@/utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: '',
    avatar: '',
    age: 0,
    country: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Login
    async login(loginForm: LoginReq) {
      const res = await userLogin(loginForm);
      setToken(res.data.token);
    },
    // Get user's information
    async fetchInfo() {
      const res = await getUserInfo();
      console.log('>>>fetchInfo', res);
      this.setInfo(res.data);
    },
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // Reset user's information
    resetInfo() {
      this.$reset();
    },
    // Logout
    async logout() {
      try {
        // TODO: request logout api
        // await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
    // After logout
    logoutCallBack() {
      this.resetInfo();
      clearToken();
      // TODO: other handler after logout
    },
  },
});