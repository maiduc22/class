import { RegisterPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserRole, IUserRoleDict } from '@/types/models/IUser';
import {
  Button,
  Group,
  ScrollArea,
  Select,
  Stack,
  TextInput
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';

interface Props {
  closeModal: () => void;
  user: IUser | undefined;
}

export const ModalEditUser = ({ closeModal, user }: Props) => {
  const dispatch = useAppDispatch();

  const form = useForm<RegisterPayload>({
    initialValues: {
      username: user?.username || '',
      password: user?.password || '',
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      dayOfBirth: user?.dayOfBirth || '',
      role: user?.role || IUserRole.STUDENT
    },
    validate: {
      username: isNotEmpty('Tên đăng nhập không được bỏ trống'),
      password: isNotEmpty('Mật khẩu không được bỏ trống'),
      fullName: isNotEmpty('Họ tên không được bỏ trống'),
      phoneNumber: isNotEmpty('Số điện thoại không được bỏ trống'),
      dayOfBirth: isNotEmpty('Ngày sinh không được bỏ trống')
    },
    transformValues: (values) => ({
      ...values,
    //   dayOfBirth: dayjs(values.dayOfBirth).toISOString()
    })
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.updateUser(values, user?.id, {
            onSuccess: () => {
              dispatch(UserActions.getAllUser());
              closeModal();
            }
          })
        )
      )}
    >
      <ScrollArea h={500}>
        <ScrollArea h={500}>
          <Stack spacing={'sm'}>
            <TextInput
              withAsterisk
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              {...form.getInputProps('username')}
            />
            <TextInput
              withAsterisk
              label="Họ tên"
              placeholder="Nhập họ tên"
              {...form.getInputProps('fullName')}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Nhập email"
              type={'email'}
              {...form.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              {...form.getInputProps('password')}
            />
            <TextInput
              withAsterisk
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              {...form.getInputProps('phoneNumber')}
            />
            <DatePickerInput
              label="Ngày sinh"
              placeholder="Nhập ngày sinh"
              {...form.getInputProps('dayOfBirth')}
            />

            <Select
              data={[
                {
                  value: IUserRole.ADMIN,
                  label: IUserRoleDict.ROLE_ADMIN['label']
                },
                {
                  value: IUserRole.TEACHER,
                  label: IUserRoleDict.ROLE_TEACHER['label']
                },
                {
                  value: IUserRole.STUDENT,
                  label: IUserRoleDict.ROLE_STUDENT['label']
                }
              ]}
              label="Vai trò"
              placeholder="Chọn chọn vai trò"
              {...form.getInputProps('role')}
            />
          </Stack>
        </ScrollArea>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Cập nhật</Button>
      </Group>
    </form>
  );
};
