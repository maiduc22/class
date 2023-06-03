import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Page404 from './Error/404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      {/* <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
        <Route path={ROUTER.SIGNUP} element={<SignUp />} />
      </Route> */}
      <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
