import { CreateNotificationPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { RootState } from '@/redux/reducers';
import { CourseActions } from '@/redux/reducers/course/course.action';
import { NotificationActions } from '@/redux/reducers/notification/notification.action';
import { IUserRole } from '@/types/models/IUser';
import {
  Button,
  Checkbox,
  FileInput,
  Group,
  MultiSelect,
  Stack,
  TextInput
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import jwt_decode from 'jwt-decode';
import React, { useLayoutEffect, useState } from 'react';

interface Props {
  close: () => void;
}
export const ModalAddNotification: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(CourseActions.getAllCourses());
  }, [dispatch]);
  
  const { courses } = useAppSelector((state: RootState) => state.course);
  const getMultiSelectData = () => {
    if (decodedToken.role === IUserRole.ADMIN) {
      return courses.map((c) => ({ value: c.id, label: c.name }));
    }
    return courses
      .filter((c) => c.teacher.id === decodedToken.id)
      .map((c) => ({ value: c.id, label: c.name }));
  };

  const decodedToken: { role: string; id: string } = jwt_decode(
    localStorage.getItem('token') || ''
  );
  const form = useForm<CreateNotificationPayload>({
    initialValues: {
      title: '',
      content: '',
      fileUrls: [],
      senderId: decodedToken.id,
      public: true,
      courseIds: getMultiSelectData().map((i) => i.value)
    },
    validate: {
      title: isNotEmpty('Không được để trống'),
      content: isNotEmpty('Không được để trống')
    }
  });

  const [, setPreviewImage] = useState<FileWithPath>();
  const [isLoadingUpload, , handleUploadImageOnFirebase] = useUploadFirebase();

  const handleSubmit = (value: CreateNotificationPayload) => {
    // console.log(value);
    dispatch(
      NotificationActions.createNotification(value, {
        onSuccess: () => {
          dispatch(NotificationActions.getAllNotifications());
          close();
        }
      })
    );
  };

  return (
    <form
      id="create-noti"
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <Stack spacing={'md'}>
        <TextInput
          label="Tiêu đề"
          placeholder=""
          {...form.getInputProps('title')}
        />

        <TextInput
          label="Nội dung"
          placeholder=""
          {...form.getInputProps('content')}
        />

        <FileInput
          label="Tệp đính kèm (có thể bỏ qua)"
          icon={<IconUpload size={'1rem'} />}
          onChange={(files) => {
            if (files) {
              setPreviewImage(files);
              handleUploadImageOnFirebase(files, {
                onSuccess: (downloadUrl) => {
                  const newFileUrls = [...form.values.fileUrls, downloadUrl];
                  form.setFieldValue('fileUrls', newFileUrls);
                }
              });
            }
            console.log(files);
          }}
        />

        <Checkbox
          label="Gửi đến toàn bộ tài khoản"
          checked={form.values.public}
          onChange={(e) => {
            form.setFieldValue('public', e.currentTarget.checked);
            if (e.currentTarget.checked === true) {
              console.log(getMultiSelectData().map((i) => i.value));
              form.setFieldValue(
                'courseIds',
                getMultiSelectData().map((i) => i.value)
              );
            }
          }}
        />
        {!form.values.public && (
          <MultiSelect
            data={getMultiSelectData()}
            label="Chọn lớp"
            value={form.values.courseIds || []}
            onChange={(value) => {
              console.log(value);
              form.setFieldValue('courseIds', value);
              console.log(form.values.courseIds);
            }}
          />
        )}
        <Group position="right">
          <Button type={'submit'} form="create-noti" loading={isLoadingUpload}>
            Tạo thông báo
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
