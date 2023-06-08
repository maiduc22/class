import { CreateDepartmentPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { DepartmentActions } from '@/redux/reducers/department/department.action';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  closeModal: () => void;
}

const ModalCreateDepartment: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const form = useForm<CreateDepartmentPayload>({
    initialValues: {
      name: '',
      description: ''
    },
    validate: {
      name: isNotEmpty('Không được để trống'),
      description: isNotEmpty('Không được để trống')
    }
  });
  return (
    <form
      id="form-create-department"
      onSubmit={form.onSubmit((values) => {
        dispatch(
          DepartmentActions.createDepartment(values, {
            onSuccess: () => {
              closeModal();
              dispatch(DepartmentActions.getAllDepartment());
            }
          })
        );
      })}
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Tên phòng ban"
          placeholder="Nhập tên phòng ban"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Mô tả"
          placeholder="Nhập mô tả"
          {...form.getInputProps('description')}
        />
        <Group position={'right'}>
          <Button type={'submit'}>Tạo</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ModalCreateDepartment;
