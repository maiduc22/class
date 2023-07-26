import { Col, Grid, Stack } from '@mantine/core';
import { UpcomingEvents } from './components/UpcomingEvents';
import { MyTimeOff } from './components/MyTimeoff';
import { MyNews } from './components/MyNews';
import { CheckAttendance } from './components/CheckAttendance';

export const Home = () => {
  return (
    <Stack px={'xl'} spacing={30}>
      <UpcomingEvents />
      <Grid gutter={50}>
        <Col span={7}>
          <MyTimeOff />
        </Col>
        <Col span={5}>
          <CheckAttendance />
        </Col>
      </Grid>
      <Grid gutter={50}>
        <Col span={7}>
          <MyNews />
        </Col>
      </Grid>
    </Stack>
  );
};
