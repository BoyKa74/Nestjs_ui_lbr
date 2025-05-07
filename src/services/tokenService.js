import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { refreshTokenFn } from './authService';

class TokenService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  getAccessToken() {
    return this.accessToken;
  }

  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async refreshAccessToken(client) {
    if (!this.refreshToken) return null;

    const newTokens = await refreshTokenFn(client, this.refreshToken);
    if (newTokens) {
      this.setTokens(newTokens.accessToken, newTokens.refreshToken);
      return newTokens.accessToken;
    }
    return null;
  }

  createAuthLink(client) {
    return setContext(async (_, { headers }) => {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          headers: {
            ...headers,
          }
        };
      }

      try {
        // Thêm token vào header
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          }
        };
      } catch (error) {
        // Nếu có lỗi, thử refresh token
        const newToken = await this.refreshAccessToken(client);
        if (newToken) {
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${newToken}`,
            }
          };
        }
        return { headers };
      }
    });
  }
}

export const tokenService = new TokenService();