import { Col, Grid, Stack } from '@mantine/core';
import { UpcomingEvents } from './components/UpcomingEvents';
import { MyTimeOff } from './components/MyTimeoff';
import { MyNews } from './components/MyNews';
import { CheckAttendance } from './components/CheckAttendance';

export const Home = () => {
  return (
    <Stack px={50} spacing={30}>
      <UpcomingEvents />
      <Grid gutter={'xl'}>
        <Col span={4}>
          <MyTimeOff />
        </Col>
        <Col span={3}>
          <CheckAttendance />
        </Col>
      </Grid>
      <MyNews />
    </Stack>
  );
};
