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
    }),
    create: () => ({
      endPoint: `/register`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Role: {
    getAll: () => ({
      endPoint: '/roles',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: '/roles',
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    update: (id: string) => ({
      endPoint: `/roles/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    toggle: (id: string) => ({
      endPoint: `roles/${id}/toggle`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    delete: (id: string) => ({
      endPoint: `roles/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    assignPermission: (id: string) => ({
      endPoint: `roles/${id}/assign-permission`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Permission: {
    getAll: () => ({
      endPoint: '/permissions',
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  }
};
