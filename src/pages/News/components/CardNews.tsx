import { INew, INewStatusDict } from '@/types/models/INew';
import { formatDateFromISOString } from '@/utils/helpers';
import { Badge, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { IconClock, IconEdit, IconFlag, IconTrash } from '@tabler/icons-react';

interface Props {
  news: INew;
}

export const CardNews = ({ news }: Props) => {
  const { isImportant, status, title, createdAt, authorName } = news;
  return (
    <Card withBorder radius={'sm'}>
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
          <IconEdit size={'1.2rem'} cursor={'pointer'} />
          <IconTrash color="red" size={'1.2rem'} cursor={'pointer'} />
        </Group>
      </Group>
    </Card>
  );
};
