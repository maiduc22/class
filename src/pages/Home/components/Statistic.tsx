import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  createStyles,
  rem
} from '@mantine/core';
import { useEffect, useState } from 'react';

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus
} from '@tabler/icons-react';
import { useAppSelector } from '@/hooks/redux';
import { RoomState } from '@/redux/reducers/room/room.type';
import { RootState } from '@/redux/reducers';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center'
  },

  icon: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase'
  }
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin
};

interface StatsGridProps {
  data: {
    title: string;
    icon: keyof typeof icons;
    value: string;
    diff: number;
  }[];
}

export function StatsGrid() {
  const api = API_URLS.Statistic.getStatistic();
  const [stat, setStat] = useState([]);
  const getStatistic = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      console.log(response.data.data);
      setStat(response.data.data);
    }
  };

  useEffect(() => {
    getStatistic();
  }, []);

  const { students } = useAppSelector((state: RootState) => state.student);
  const { teachers } = useAppSelector((state: RootState) => state.teacher);

  const totalMembers = stat.reduce((sum, course) => sum + course.members, 0);
  const averageMembers = totalMembers / stat.length;
  const data = [
    {
      title: 'Học viên',
      icon: 'receipt',
      value: students.length,
      description: 'Đang học tại trung tâm'
    },
    {
      title: 'Khoá học',
      icon: 'coin',
      value: stat.length,
      description: 'Đang mở tại trung tâm'
    },
    {
      title: 'Giáo viên',
      icon: 'discount',
      value: teachers.length,
      diff: 18,
      description: 'Đang giảng dạy tại trung tâm'
    },
    {
      title: 'Trung bình',
      icon: 'user',
      value: averageMembers,
      description: 'Học sinh mỗi lớp'
    }
  ];
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          {stat.description}
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <Text fw={500} fz={'lg'} mb={'md'}>
        Thống kê
      </Text>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 }
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
