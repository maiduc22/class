import { ROUTER } from '@/configs/router';
import { useAppDispatch } from '@/hooks/redux';
import { NewsActions } from '@/redux/reducers/news/news.action';
import { INew, INewStatus, INewStatusDict } from '@/types/models/INew';
import { formatDateFromISOString } from '@/utils/helpers';
import { Badge, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { IconClock, IconEdit, IconFlag, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  news: INew;
}

export const CardNews = ({ news }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isImportant, status, title, createdAt, authorName, id } = news;
  return (
    <Card
      withBorder
      radius={'sm'}
      onClick={() => navigate(`${ROUTER.NEWS}/${id}`)}
      sx={{ cursor: 'pointer' }}
    >
      <Group position="apart" align="center">
        <Stack spacing={'xs'}>
          <Group spacing={'xs'} align="center">
            {isImportant ? (
              <IconFlag color="red" size={'1.2rem'} stroke={'1.5'} />
            ) : null}
            <Text fw={600}>{title}</Text>
            <Badge radius={'xs'} color={INewStatusDict[status].color}>
              {INewStatusDict[status].label}
            </Badge>
          </Group>
          <Group spacing={'xs'} align="center">
            <IconClock color="gray" size={'1rem'} />
            <Text color="dimmed">{formatDateFromISOString(createdAt)}</Text>
            <Divider orientation="vertical" />
            <Text>{authorName}</Text>
          </Group>
        </Stack>
        <Group>
          {status === INewStatus.DRAFT ? (
            <IconEdit
              size={'1.2rem'}
              cursor={'pointer'}
              onClick={() => navigate(`${ROUTER.NEWS}/${id}`)}
            />
          ) : null}
          <IconTrash
            color="red"
            size={'1.2rem'}
            cursor={'pointer'}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                NewsActions.deleteNew(id, {
                  onSuccess: () => dispatch(NewsActions.getAllNews())
                })
              );
            }}
          />
        </Group>
      </Group>
    </Card>
  );
};
