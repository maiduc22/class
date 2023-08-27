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
    }),
    getTeacherById: (id: string) => ({
      endPoint: `/teachers/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },
  Facility: {
    getAllFacility: () => ({
      endPoint: '/facilities',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    createFacility: () => ({
      endPoint: `/facilities`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    updateFacility: (id: string) => ({
      endPoint: `/facilities/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    deleteFacility: (id: string) => ({
      endPoint: `/facilities/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  },
  Room: {
    getAllRooms: () => ({
      endPoint: '/rooms',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    getRoomByID: (id: string) => ({
      endPoint: `/rooms/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    createRoom: () => ({
      endPoint: `/rooms`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    updateRoom: (id: string) => ({
      endPoint: `/rooms/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),
    deleteRoom: (id: string) => ({
      endPoint: `/rooms/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  }
};
