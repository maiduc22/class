import { Col, Grid, Stack } from '@mantine/core';
import { UpcomingEvents } from './components/UpcomingEvents';

export const Home = () => {
  return (
    <Grid mt={'lg'}>
      <Col span={8}>
        <Stack>
          <UpcomingEvents />
        </Stack>
      </Col>
      <Col span={5}></Col>
    </Grid>
  );
};
