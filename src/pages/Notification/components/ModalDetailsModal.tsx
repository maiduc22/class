import { useAppDispatch } from '@/hooks/redux';
import { NotificationActions } from '@/redux/reducers/notification/notification.action';
import { INotification } from '@/types/models/INotification';
import { Badge, Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

interface Props {
  close: () => void;
  id: string;
}
export const ModalDetailsNotification = ({ close, id }: Props) => {
  const [noti, setNoti] = useState<INotification>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      NotificationActions.getNotificationById(id, {
        onSuccess: (data) => {
          setNoti(data);
          console.log(data);
        }
      })
    );
  }, [dispatch, id]);

  return (
    <Stack>
      <Stack spacing={5}>
        <Text fw={500}>Người gửi</Text>
        <Text>{noti?.senderName}</Text>
      </Stack>
      <Stack spacing={5}>
        <Text fw={500}>Tiêu đề</Text>
        <Text>{noti?.title}</Text>
      </Stack>
      <Stack spacing={5}>
        <Text fw={500}>Nội dung</Text>
        <Text>{noti?.content}</Text>
      </Stack>
      <Stack spacing={5}>
        <Text fw={500}>File đính kèm</Text>
        <Text>{noti?.fileUrls[0]}</Text>
      </Stack>
      {noti?.isPublic ? (
        <Text fw={500}>Toàn bộ tài khoản đều nhận được</Text>
      ) : (
        <Stack spacing={5}>
          <Text fw={500}>Danh sách lớp nhận được</Text>
          <Group>
            {noti?.courses?.map((c) => (
              <Badge>
                <Text>Lớp {c.name}</Text>
              </Badge>
            ))}
          </Group>
        </Stack>
      )}
    </Stack>
  );
};
