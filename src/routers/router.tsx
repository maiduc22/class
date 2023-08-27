import AuthLayout from '@/layouts/AuthLayout';
import BaseLayout from '@/layouts/BaseLayout';

import { ROUTER } from '@/configs/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import Page403 from '@/pages/Error/403';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import Teacher from '@/pages/Teacher';
import { TeacherDetails } from '@/pages/TeacherDetails';
import Page404 from '../pages/Error/404';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import { User } from '../pages/User';
import { Room } from '@/pages/Room';
import { Course } from '@/pages/Course';
import { Facility } from '@/pages/Facility';

const router = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<BaseLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTER.LOGIN} element={<Login />} />
        </Route>
        <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
          <Route path={ROUTER.BASE} element={<Home />} />
          {/* <Route path={ROUTER.PROFILE} element={<Profile />} /> */}
          <Route path={ROUTER.TEACHER} element={<Teacher />} />
          <Route path={ROUTER.TEACHER_DETAILS} element={<TeacherDetails />} />
          <Route path={ROUTER.USER} element={<User />} />
          <Route path={ROUTER.ROOM} element={<Room />} />
          <Route path={ROUTER.FACILITY} element={<Facility />} />
          <Route path={ROUTER.COURSE} element={<Course />} />
          <Route path={ROUTER.UNAUTHORIZE} element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
    )
  );
};

export default router;
