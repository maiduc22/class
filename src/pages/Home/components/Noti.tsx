import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { NotificationActions } from '@/redux/reducers/notification/notification.action';
import { Button, Card, Col, Grid, Group, Stack, Text } from '@mantine/core';
import { useLayoutEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { IconDownload } from '@tabler/icons-react';
import { handleDownloadFile } from '@/pages/Notification';

export const Noti = () => {
  const decodedToken: { role: string; id: string } = jwt_decode(
    localStorage.getItem('token') || ''
  );
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(NotificationActions.getAllNotifications());
  }, []);

  const { notifications } = useAppSelector(
    (state: RootState) => state.notification
  );

  return (
    <Stack mt={'lg'}>
      <Text fw={500} fz={'lg'}>
        Thông báo
      </Text>
      <Grid>
        {notifications
          .filter((n) => n.senderId !== decodedToken.id)
          .map((n) => (
            <Col span={3}>
              <Card bg={'white'} withBorder radius={'md'} shadow="sm">
                <Stack></Stack>
                <Group position="apart">
                  <Stack spacing={2}>
                    <Text fw={500}>Tiêu đề</Text>
                    <Text>{n.title}</Text>
                  </Stack>
                  <Stack spacing={2}>
                    <Text fw={500}>Người gửi</Text>
                    <Text>{n.senderName}</Text>
                  </Stack>
                </Group>
                <Stack spacing={2}>
                  <Text fw={500}>Nội dung</Text>
                  <Text>{n.content}</Text>
                </Stack>
                {n.fileUrls[0] && (
                  <Stack spacing={2}>
                    <Text fw={500}>File đính kèm</Text>
                    <Button
                      variant="outline"
                      leftIcon={<IconDownload size={'1rem'} />}
                      size="xs"
                      onClick={() => handleDownloadFile(n.fileUrls[0])}
                    >
                      Tải xuống
                    </Button>
                  </Stack>
                )}
              </Card>
            </Col>
          ))}
      </Grid>
    </Stack>
  );
};
