import { Stack } from '@mantine/core';
import { MyRequests } from './components/MyRequests';
import { BalanceHistory } from './components/BalanceHistory';

export const TimeOff = () => {
  return (
    <Stack>
      <MyRequests />
      <BalanceHistory />
    </Stack>
  );
};
