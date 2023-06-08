import BaseLayout from '@/layouts/BaseLayout';
import AuthLayout from '@/layouts/AuthLayout';

import { ROUTER } from '@/configs/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Page404 from './Error/404';
import Login from './Login';
import Department from './Department';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
      </Route>
      <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
        <Route path={ROUTER.DEPARTMENT} element={<Department />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
