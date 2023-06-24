import { RegisterPayload } from '@/configs/api/payload';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { IUserGender, IUserGenderDict } from '@/types/models/IUser';
import {
  Avatar,
  Box,
  Button,
  Center,
  Col,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Checkbox,
  MultiSelect
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm, isEmail } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

export const UserDetails = () => {
  const form = useForm<RegisterPayload>({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: IUserGender.MALE,
      roleIds: [],
      description: '',
      dayOfBirth: undefined,
      avatar: ''
    },
    validate: {
      username: isNotEmpty('Tên đăng nhập không được bỏ trống'),
      password: isNotEmpty('Mật khẩu không được bỏ trống'),
      fullName: isNotEmpty('Họ tên không được bỏ trống'),
      email: isEmail('Email không đúng định dạng'),
      phoneNumber: isNotEmpty('Số điện thoại không được bỏ trống'),
      dayOfBirth: isNotEmpty('Ngày sinh không được bỏ trống'),
      roleIds: isNotEmpty('Chưa lựa chọn vai trò')
    },
    transformValues: (values) => ({
      ...values,
      dayOfBirth: dayjs(values.dayOfBirth).toISOString()
    })
  });

  const [_isEditing, setIsEditing] = useState(false);
  const { roles } = useAppSelector((state: RootState) => state.role);
  const { departments } = useAppSelector(
    (state: RootState) => state.department
  );
  const [selectedGender, setSelectedGender] = useState<IUserGender>(
    form.values.gender
  );

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleSubmit = (values: RegisterPayload) => {
    console.log(values);
    setIsEditing(false);
  };

  return (
    <>
      <Group position="apart" mb={'md'}>
        <Text fw={600} size={'lg'}>
          Thông tin nhân sự
        </Text>
        <Button>Xoá nhân sự</Button>
      </Group>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
          <Col span={3}>
            <Stack w={'100%'}>
              <Text align="left" color="dimmed">
                Ảnh đại diện
              </Text>
              <Center>
                <Box sx={{ position: 'relative' }}>
                  <Avatar size={250} w={'100%'} color="cyan" radius="xl" />
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
          <Col span={4}>
            <Stack spacing={'md'}>
              <Text align="left" color="dimmed">
                Thông tin cá nhân
              </Text>
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
                {...form.getInputProps('phone')}
              />
              <TextInput
                label="Email"
                placeholder="Nhập email"
                disabled={!_isEditing}
                size={'sm'}
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                disabled={!_isEditing}
                {...form.getInputProps('phoneNumber')}
              />
              <DatePickerInput
                label="Ngày sinh"
                placeholder="Nhập ngày sinh"
                disabled={!_isEditing}
                {...form.getInputProps('dayOfBirth')}
              />
              <Group position="left">
                <Text fw={600} fz="sm">
                  Giới tính
                </Text>
                <Checkbox
                  disabled={!_isEditing}
                  label={IUserGenderDict[IUserGender.MALE].label}
                  checked={selectedGender === IUserGender.MALE}
                  onChange={() => setSelectedGender(IUserGender.MALE)}
                />
                <Checkbox
                  disabled={!_isEditing}
                  label={IUserGenderDict[IUserGender.FEMALE].label}
                  checked={selectedGender === IUserGender.FEMALE}
                  onChange={() => setSelectedGender(IUserGender.FEMALE)}
                />
              </Group>
            </Stack>
          </Col>
          <Col span={5} pos={'relative'}>
            <Stack>
              <Text align="left" color="dimmed">
                Vị trí, chức vụ
              </Text>
              <MultiSelect
                disabled={!_isEditing}
                data={departments.map(({ name, id }) => ({
                  value: id,
                  label: name
                }))}
                label="Phòng ban"
                placeholder="Chọn phòng ban"
                // {...form.getInputProps('roleIds')}
              />
              <MultiSelect
                disabled={!_isEditing}
                data={roles.map(({ name, id }) => ({
                  value: id,
                  label: name
                }))}
                label="Vai trò"
                placeholder="Chọn vai trò"
                {...form.getInputProps('roleIds')}
              />
              <Group
                position="right"
                pos={'absolute'}
                bottom={0}
                left={0}
                right={0}
              >
                {_isEditing ? (
                  <Button onClick={handleCancel} variant="outline">
                    Huỷ
                  </Button>
                ) : null}
                <Button
                  leftIcon={<IconEdit size={'1rem'} />}
                  // type={_isEditing ? 'submit' : 'button'}
                  onClick={
                    _isEditing
                      ? () => handleSubmit(form.values)
                      : () => setIsEditing(true)
                  }
                >
                  {_isEditing ? 'Lưu thông tin' : 'Sửa thông tin'}
                </Button>
              </Group>
            </Stack>
          </Col>
        </Grid>
      </form>
    </>
  );
};
