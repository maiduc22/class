import { HEADERS } from './header';

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: '/authenticate',
      method: 'POST',
      headers: HEADERS.header()
    }),
    getAuthorities: () => ({
      endPoint: '/me/authorities',
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },
  Department: {
    getAll: () => ({
      endPoint: `/departments`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `/departments`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/departments/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `/departments/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  User: {
    getAll: () => ({
      endPoint: '/users',
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  }
};
