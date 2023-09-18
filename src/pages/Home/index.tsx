import { Stack } from '@mantine/core';
import { Timetable } from './components/Timetable';
import jwt_decode from 'jwt-decode';
import { IUserRole } from '@/types/models/IUser';
import { StatsGrid } from './components/Statistic';
import { Noti } from './components/Noti';

export const Home = () => {
  const decodedToken: { role: string; id: string } = jwt_decode(
    localStorage.getItem('token') || ''
  );
  const { role, id } = decodedToken;
  console.log({ role, id });
  return (
    <Stack>
      {role === IUserRole.ADMIN ? <StatsGrid /> : <Timetable id={id} />}

      <Noti />
    </Stack>
  );
};
