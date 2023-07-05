import { IUser } from '@/types/models/IUser';
import { Avatar, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { IconCalendar, IconUser } from '@tabler/icons-react';

interface Props {
  usersList: IUser[];
  date: string;
  type: EventType;
}

export enum EventType {
  BIRTHDAY = 'BIRTHDAY',
  ANNIVERSARY = 'ANNIVERSARY'
}

export const EventPopover = ({ usersList, date, type }: Props) => {
  return (
    <Card>
      <Stack>
        <Text fw={600} fz={'lg'}>
          {type === EventType.BIRTHDAY ? 'Sinh nhật' : 'Kỉ niệm'}
        </Text>
        <Divider />
        <Group align="center">
          <IconCalendar size={'1.5rem'} />
          <Text>{date}</Text>
        </Group>
        <Group align={'flex-start'}>
          <IconUser size={'1.5rem'} />
          <Stack>
            <Text>`${usersList.length} người`</Text>
            {usersList.map((user) => (
              <Group>
                <Avatar src={user.avatarFileId} />
                <Stack>
                  <Text>{user.fullName}</Text>
                  <Text>{user.roles[0].name}</Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};
