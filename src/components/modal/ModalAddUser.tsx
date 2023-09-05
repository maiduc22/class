import { RegisterPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { StudentActions } from '@/redux/reducers/student/student.action';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUserRole } from '@/types/models/IUser';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

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
      role: role
    },
    validate: {
      username: isNotEmpty('Tên đăng nhập không được bỏ trống'),
      password: isNotEmpty('Mật khẩu không được bỏ trống'),
      fullName: isNotEmpty('Họ tên không được bỏ trống')
    },
    transformValues: (values) => ({
      ...values
    })
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.createUser(values, {
            onSuccess: () => {
              dispatch(TeacherActions.getAllTeacher());
              dispatch(StudentActions.getAllStudent());
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
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          {...form.getInputProps('password')}
        />
      </Stack>

      <Group position="right" mt={'md'}>
        <Button type="submit">Thêm mới</Button>
      </Group>
    </form>
  );
};
