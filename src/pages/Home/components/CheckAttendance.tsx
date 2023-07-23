import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { IconClock2, IconLogin, IconLogout } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const CheckAttendance = () => {
  const theme = useMantineTheme();
  const [_currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const [_isCheckin, setIsCheckin] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(dayjs(new Date()));
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCheckInOut = () => {
    setIsCheckin(!_isCheckin);
  };

  return (
    <Card withBorder w={'100%'} p={'xl'} shadow={'xs'}>
      <Stack>
        <Group position="apart">
          <Group>
            <IconClock2
              size={'2rem'}
              style={{
                background: `${theme.colors.blue[7]}`,
                borderRadius: '50%',
                padding: '5px'
              }}
              color="white"
            />
            <Text fw={'bold'} fz={'md'}>
              Check in/out
            </Text>
          </Group>
          <Text fw={'bold'} fz={'md'}>
            {_currentDate.format('hh:mm - DD MMM').toString()}
          </Text>
        </Group>
        <Button
          color={_isCheckin ? 'red' : 'blue'}
          leftIcon={_isCheckin ? <IconLogout /> : <IconLogin />}
          onClick={handleCheckInOut}
        >
          {_isCheckin ? 'Check out' : 'Check in'}
        </Button>
      </Stack>
    </Card>
  );
};
