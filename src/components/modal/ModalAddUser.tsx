import { RegisterPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUserRole } from '@/types/models/IUser';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';

interface Props {
  closeModal: () => void;
  role: IUserRole;
}

export const ModalAddUser = ({ closeModal, role }: Props) => {
  const dispatch = useAppDispatch();

  const form = useForm<RegisterPayload>({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      dayOfBirth: undefined,
      role: role
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
      dayOfBirth: dayjs(values.dayOfBirth).toISOString()
    })
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.createUser(values, {
            onSuccess: () => {
              dispatch(TeacherActions.getAllTeacher());
              closeModal();
            }
          })
        )
      )}
    >
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

        {/* <Select
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
          /> */}
      </Stack>

      <Group position="right" mt={'md'}>
        <Button type="submit">Thêm mới</Button>
      </Group>
    </form>
  );
};
