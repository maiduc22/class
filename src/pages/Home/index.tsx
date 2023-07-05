import { Col, Grid, Stack } from '@mantine/core';
import { UpcomingEvents } from './components/UpcomingEvents';
import { MyTimeOff } from './components/MyTimeoff';
import { MyNews } from './components/MyNews';

export const Home = () => {
  return (
    <Stack px={'xl'} spacing={'xl'}>
      <UpcomingEvents />
      <Grid>
        <Col span={6}>
          <MyTimeOff />
        </Col>
      </Grid>
      <MyNews />
    </Stack>
  );
};
