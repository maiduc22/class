import { useAppDispatch } from '@/hooks/redux';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { IRoom } from '@/types/models/IRoom';
import { Button, Card, Grid, Group, Image, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface Props {
  close: () => void;
  id: string | undefined;
}

export const ModalDetailsRoom: React.FC<Props> = ({ close, id }) => {
  const [room, setRoom] = useState<IRoom>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(
        RoomActions.getRoomById(id, {
          onSuccess: (data) => setRoom(data)
        })
      );
    }
  }, [dispatch, id]);

  return (
    <Stack spacing={'md'}>
      <Group>
        <Text fw={500}>Tên phòng học: </Text>
        <Text color="dimmed">{room?.name}</Text>
      </Group>
      <Group>
        <Text fw={500}>Mô tả: </Text>
        <Text color="dimmed">{room?.description}</Text>
      </Group>
      <Group>
        <Text fw={500}>Số chỗ ngồi: </Text>
        <Text color="dimmed">{room?.capacity}</Text>
      </Group>
      <Group>
        <Text fw={500}>Danh sách cơ sở vật chất</Text>
      </Group>
      {room?.facilities.map((facility) => (
        <Card shadow="md">
          <Grid align="center">
            <Grid.Col span={7}>
              <Group spacing="xl">
                <Image
                  width={56}
                  height={56}
                  src={facility.image}
                  withPlaceholder
                />
                <Text lineClamp={1}>{facility.name}</Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
      ))}
      <Group position="right">
        <Button onClick={close}>Đóng</Button>
      </Group>
    </Stack>
  );
};
