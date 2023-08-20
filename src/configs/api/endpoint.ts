import { HEADERS } from './header';

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: '/auth/login',
      method: 'POST',
      headers: HEADERS.header()
    }),
    getProfile: () => ({
      endPoint: '/me',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    changeProfile: (id: string) => ({
      endPoint: `/me/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    changePassword: () => ({
      endPoint: `/me/change-pwd`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  User: {
    getAll: () => ({
      endPoint: '/users',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `/auth/register`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    updateUser: (id: string) => ({
      endPoint: `/users/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    deleteUser: (id: string) => ({
      endPoint: `/users/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Teacher: {
    getAll: () => ({
      endPoint: '/teachers',
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  }
};
