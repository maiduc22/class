import { ChangeProfilePayload } from '@/configs/api/payload';
import { useAuthContext } from '@/hooks/context';
import { IUserGender, IUserGenderDict } from '@/types/models/IUser';
import { NotiType, renderNotification } from '@/utils/notifications';
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Col,
  Grid,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

export const Profile = () => {
  const { state, updateProfile, getProfile } = useAuthContext();
  const { profile } = state;

  const form = useForm<ChangeProfilePayload>({
    initialValues: {
      fullName: profile?.fullName || '',
      email: profile?.email || '',
      phoneNumber: profile?.phoneNumber || '',
      gender: profile?.gender || IUserGender.MALE,
      description: profile?.description || '',
      dayOfBirth: dayjs(profile?.dayOfBirth).toDate() || undefined,
      avatarFileId: profile?.avatarFileId || '',
      roleIds: profile?.roles.map(({ id }) => id) || [],
      departmentId: profile?.departmentId || ''
    },
    validate: {
      fullName: isNotEmpty('Họ tên không được bỏ trống'),
      email: isEmail('Email không đúng định dạng'),
      phoneNumber: isNotEmpty('Số điện thoại không được bỏ trống'),
      dayOfBirth: isNotEmpty('Ngày sinh không được bỏ trống')
    }
  });
  const [_isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleSubmit = (values: ChangeProfilePayload) => {
    if (!form.isDirty()) {
      renderNotification('Bạn chưa thay đổi thông tin gì', NotiType.ERROR);
    } else {
      updateProfile(values, profile?.id, {
        onSuccess: () => getProfile(),
        onError: () => form.reset()
      });
      setIsEditing(false);
    }
  };
  return (
    <>
      <Text fw={600} size={'lg'}>
        Thông tin cá nhân
      </Text>
      <Grid>
        <Col span={6}>
          <Stack w={'100%'}>
            <Text align="left" color="dimmed">
              Ảnh đại diện
            </Text>
            <Center>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  size={250}
                  w={'100%'}
                  color="blue"
                  radius="xl"
                  src={form.values.avatarFileId}
                />
                <IconEdit
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                  }}
                  cursor={'pointer'}
                />
              </Box>
            </Center>
          </Stack>
        </Col>
        <Col span={6}>
          <Stack spacing={'md'}>
            <Text align="left" color="dimmed">
              Thông tin cá nhân
            </Text>
            <form>
              <TextInput
                label="Họ tên"
                placeholder="Nhập họ tên"
                disabled={!_isEditing}
                size={'sm'}
                {...form.getInputProps('fullName')}
              />
              <TextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                disabled={!_isEditing}
                size={'sm'}
                {...form.getInputProps('phoneNumber')}
              />
              <TextInput
                label="Email"
                placeholder="Nhập email"
                disabled={!_isEditing}
                size={'sm'}
                {...form.getInputProps('email')}
              />
              <DatePickerInput
                label="Ngày sinh"
                placeholder="Nhập ngày sinh"
                disabled={!_isEditing}
                {...form.getInputProps('dayOfBirth')}
              />
              <Group position="left" mt={'sm'}>
                <Text fw={600} fz="sm">
                  Giới tính
                </Text>
                <Checkbox
                  disabled={!_isEditing}
                  label={IUserGenderDict[IUserGender.MALE].label}
                  checked={form.values.gender === IUserGender.MALE}
                  onChange={() =>
                    form.setValues({ ...form.values, gender: IUserGender.MALE })
                  }
                />
                <Checkbox
                  disabled={!_isEditing}
                  label={IUserGenderDict[IUserGender.FEMALE].label}
                  checked={form.values.gender === IUserGender.FEMALE}
                  onChange={() =>
                    form.setValues({
                      ...form.values,
                      gender: IUserGender.FEMALE
                    })
                  }
                />
              </Group>
              <TextInput
                label="Mô tả"
                placeholder="Nhập mô tả"
                disabled={!_isEditing}
                {...form.getInputProps('description')}
              />
            </form>
          </Stack>
        </Col>
      </Grid>
      <Group position="right" mt={100}>
        {_isEditing ? (
          <Button onClick={handleCancel} variant="outline">
            Huỷ
          </Button>
        ) : null}
        <Button
          leftIcon={<IconEdit size={'1rem'} />}
          onClick={
            _isEditing
              ? () => handleSubmit(form.values)
              : () => setIsEditing(true)
          }
        >
          {_isEditing ? 'Lưu thông tin' : 'Sửa thông tin'}
        </Button>
      </Group>
    </>
  );
};
