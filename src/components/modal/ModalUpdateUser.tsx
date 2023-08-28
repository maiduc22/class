import { UpdateUserPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser } from '@/types/models/IUser';
import {
  Button,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  closeModal: () => void;
  user: IUser | null;
}

export const ModalUpdateUser = ({ closeModal, user }: Props) => {
  const dispatch = useAppDispatch();
  const [value, onChange] = useState<Value>(new Date());

  const validatePhone = (phone: string | undefined) => {
    if (!phone) return true;
    const passwordPattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return passwordPattern.test(phone);
  };

  const validateEmail = (email: string | undefined) => {
    if (!email) return true;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const form = useForm<UpdateUserPayload>({
    initialValues: {
      fullName: user?.fullName || '',
      dob: user?.dob || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      description: user?.description || '',
      image: user?.image || ''
    },
    validate: {
      phoneNumber: (value) => {
        if (!validatePhone(value)) {
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

  const [previewImage, setPreviewImage] = useState<FileWithPath>();
  const [isLoadingUpload, , handleUploadImageOnFirebase] = useUploadFirebase();
  const theme = useMantineTheme();
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
        <TextInput
          label="Mô tả"
          placeholder="Nhập mô tả"
          {...form.getInputProps('description')}
        />
        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh
          </Text>
          <Dropzone
            onDrop={(files) => {
              setPreviewImage(files[0]);
              handleUploadImageOnFirebase(files[0], {
                onSuccess: (imageURL) => {
                  console.log(imageURL);
                  form.setFieldValue('image', imageURL);
                }
              });
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps(`image`)}
          >
            <Group
              position="center"
              spacing="xs"
              style={{ pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size="2rem"
                  stroke={1.5}
                  color={theme.colors[theme.primaryColor][6]}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2rem" stroke={1.5} color={theme.colors.red[6]} />
              </Dropzone.Reject>

              {previewImage ? (
                <ScrollArea h={300} w={300}>
                  <Image
                    src={URL.createObjectURL(previewImage)}
                    imageProps={{
                      onLoad: () =>
                        URL.revokeObjectURL(URL.createObjectURL(previewImage))
                    }}
                  />
                </ScrollArea>
              ) : (
                <>
                  {user?.image ? (
                    <Stack spacing={0} align="center">
                      <Image src={user?.image} />
                    </Stack>
                  ) : (
                    <>
                      <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                      </Dropzone.Idle>
                      <Stack spacing={0} align="center">
                        <Text size="sm" inline>
                          Kéo thả hoặc nhấn để chọn file ảnh
                        </Text>
                        <Text size="xs" color="dimmed" inline mt={7}>
                          Chọn 1 ảnh duy nhất, kích cỡ không quá 5MB
                        </Text>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Group>
          </Dropzone>
        </Stack>
      </Stack>

      <Group position="right" mt={'xl'}>
        <Button type="submit" loading={isLoadingUpload}>
          Cập nhật
        </Button>
      </Group>
    </form>
  );
};
