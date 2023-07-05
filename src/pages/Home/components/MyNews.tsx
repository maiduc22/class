import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { INew } from '@/types/models/INew';
import { formatDateFromISOString } from '@/utils/helpers';
import {
  Card,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { IconClock, IconFlag, IconNews } from '@tabler/icons-react';

export const MyNews = () => {
  const { myNews } = useAppSelector((state: RootState) => state.news);
  const theme = useMantineTheme();
  return (
    <Card bg={'gray.1'} p={'xl'}>
      <Stack>
        <Group position="apart">
          <Group spacing={'xs'}>
            <IconNews
              size={'2rem'}
              style={{
                background: `${theme.colors.blue[7]}`,
                borderRadius: '50%',
                padding: '5px'
              }}
              color="white"
            />
            <Text fw={'bold'} fz={'md'}>
              Thông báo
            </Text>
          </Group>
          <Text
            color="blue.8"
            sx={{ cursor: 'pointer' }}
            // onClick={() => navigate(ROUTER.TIME_OFF)}
          >
            Xem tất cả
          </Text>
        </Group>
        {myNews.map((news) => (
          <CardNews news={news} />
        ))}
      </Stack>
    </Card>
  );
};

interface CardNewsProps {
  news: INew;
}

const CardNews = ({ news }: CardNewsProps) => {
  const { isImportant, title, createdAt, authorName } = news;
  return (
    <Card withBorder radius={'sm'} py={'xs'} px={'lg'}>
      <Group position="apart" align="center">
        <Stack spacing={'xs'}>
          <Group spacing={'xs'} align="center">
            {isImportant ? (
              <IconFlag color="red" size={'1.2rem'} stroke={'1.5'} />
            ) : null}
            <Text fw={600}>{title}</Text>
          </Group>
          <Group spacing={'xs'} align="center">
            <IconClock color="gray" size={'1rem'} />
            <Text color="dimmed">{formatDateFromISOString(createdAt)}</Text>
            <Divider orientation="vertical" />
            <Text>{authorName}</Text>
          </Group>
        </Stack>
        <Group></Group>
      </Group>
    </Card>
  );
};
