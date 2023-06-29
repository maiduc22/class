import { Col, Grid, Stack } from '@mantine/core';
import { UpcomingEvents } from './components/UpcomingEvents';
import { MyTimeOff } from './components/MyTimeoff';

export const Home = () => {
  return (
    <Stack px={'lg'} spacing={'xl'}>
      <UpcomingEvents />
      <Grid>
        <Col span={5}>
          <MyTimeOff />
        </Col>
      </Grid>
    </Stack>
  );
};
