import { ROUTER } from '@/configs/router';
import { Card, Group, Text, useMantineTheme } from '@mantine/core';
import { IconIdOff } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const MyTimeOff = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Card withBorder w={'100%'} p={'xl'} shadow={'xs'}>
      <Group position="apart">
        <Group spacing={'xs'}>
          <IconIdOff
            size={'2rem'}
            style={{
              background: `${theme.colors.blue[7]}`,
              borderRadius: '50%',
              padding: '5px'
            }}
            color="white"
          />
          <Text fw={'bold'} fz={'md'}>
            Lịch nghỉ phép
          </Text>
        </Group>
        <Text
          color="blue.8"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(ROUTER.TIME_OFF)}
        >
          Xem tất cả
        </Text>
      </Group>
    </Card>
  );
};
