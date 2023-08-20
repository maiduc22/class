import { UpdateUserPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser } from '@/types/models/IUser';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

interface Props {
  closeModal: () => void;
  user: IUser | null;
}

export const ModalUpdateUser = ({ closeModal, user }: Props) => {
  const dispatch = useAppDispatch();

  const validatePhone = (phone: string | undefined) => {
    if (!phone) return true;
    const passwordPattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return passwordPattern.test(phone);
  };

  const validateEmail = (email: string | undefined) => {
    if (!email) return true ;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const form = useForm<UpdateUserPayload>({
    initialValues: {
      fullName: user?.fullName || '',
      dob: user?.dob || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''
    },
    validate: {
      phoneNumber: (value) => {
        if (validatePhone(value)) {
          return 'Số điện thoại phải có 10 chữ số và bắt đầu bằng số không';
        }
      },
      email: (value) => {
        if (!validateEmail(value)) {
          return 'Email chưa đúng định dạng';
        }
      }
    },
    transformValues: (values) => ({
      ...values
    })
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        dispatch(
          UserActions.updateUser(values, user?.id, {
            onSuccess: () => {
              dispatch(TeacherActions.getAllTeacher());
              closeModal();
            }
          })
        )
      )}
    >
      <Stack spacing={'xl'}>
        <TextInput
          label="Họ tên"
          placeholder="Nhập họ tên"
          {...form.getInputProps('fullName')}
        />
        <TextInput
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          {...form.getInputProps('phoneNumber')}
        />
        <TextInput
          label="Email"
          placeholder="Nhập email"
          {...form.getInputProps('email')}
        />
        <DateInput
          size="sm"
          label="Ngày sinh"
          placeholder="Nhập ngày sinh"
          value={form.values.dob ? dayjs(form.values.dob).toDate() : undefined}
          onChange={(value) => {
            form.setValues({
              ...form.values,
              dob: dayjs(value).format('YYYY-MM-DD').toString()
            });
          }}
        />
      </Stack>

      <Group position="right" mt={'md'}>
        <Button type="submit">Cập nhật</Button>
      </Group>
    </form>
  );
};
