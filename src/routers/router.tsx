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
import { RoomDetails } from '@/pages/RoomDetails';
import { News } from '@/pages/News';
import { NewsDetails } from '@/pages/NewsDetails';
import Student from '@/pages/Student';
import { Feedback } from '@/pages/Feedback';

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
          <Route path={ROUTER.ROOM_DETAILS} element={<RoomDetails />} />
          <Route path={ROUTER.FACILITY} element={<Facility />} />
          <Route path={ROUTER.COURSE} element={<Course />} />
          <Route path={ROUTER.NEWS} element={<News />} />
          <Route path={ROUTER.NEWS_DETAILS} element={<NewsDetails />} />
          <Route path={ROUTER.STUDENT} element={<Student />} />
          <Route path={ROUTER.UNAUTHORIZE} element={<Page403 />} />
          <Route path={ROUTER.FEEDBACK} element={<Feedback />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
    )
  );
};

export default router;
