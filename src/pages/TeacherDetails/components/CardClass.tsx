import { IClass } from '@/types/models/IClass';
import { Badge, Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import ClassImage from '@/assets/imgs/class.avif';
interface Props {
  classInfo: IClass;
}

export const CardClass: React.FC<Props> = ({ classInfo }) => {
  const { name, start, end, students, day, room } = classInfo;
  return (
    <Card withBorder radius={'md'} shadow="xs" p={'0'}>
      <Card.Section>
        <Image height={'100px'} src={ClassImage} />
      </Card.Section>
      <Stack p={'sm'}>
        <Text fw={'bold'}>{name}</Text>
        <Group spacing={'xs'}>
          <Text fz={'sm'}>Phòng:</Text>
          <Badge>{room}</Badge>
        </Group>
        <Group spacing={'xs'}>
          <Text fz={'sm'}>Lịch học:</Text>
          {day.map((day) => (
            <Badge color="green">{day}</Badge>
          ))}
        </Group>
        <Button>Xem danh sách học sinh</Button>
      </Stack>
    </Card>
  );
};
