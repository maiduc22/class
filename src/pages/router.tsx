import AuthLayout from '@/layouts/AuthLayout';
import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Department from './Department';
import { DepartmentDetails } from './DepartmentDetails';
import Page404 from './Error/404';
import { Home } from './Home';
import Login from './Login';
import { Permission } from './Permission';
import { Profile } from './Profile';
import { Role } from './Role';
import { RoleDetails } from './RoleDetails';
import { User } from './User';
import { UserDetails } from './UserDetails';
import { TimeOff } from './TimeOff';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
      </Route>
      <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
        <Route path={ROUTER.BASE} element={<Home />} />
        <Route path={ROUTER.PROFILE} element={<Profile />} />
        <Route path={ROUTER.TIME_OFF} element={<TimeOff />} />
        <Route path={ROUTER.DEPARTMENT} element={<Department />} />
        <Route
          path={ROUTER.DEPARTMENT_DETAILS}
          element={<DepartmentDetails />}
        />
        <Route path={ROUTER.USER} element={<User />} />
        <Route path={ROUTER.USER_DETAILS} element={<UserDetails />} />
        <Route path={ROUTER.ROLE} element={<Role />} />
        <Route path={ROUTER.ROLE_DETAILS} element={<RoleDetails />} />
        <Route path={ROUTER.PERMISSION} element={<Permission />} />

        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
