import { CreateFacilityPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { FacilityActions } from '@/redux/reducers/facility/facility.action';
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
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

interface Props {
  close: () => void;
}

export const ModalAddFacility: React.FC<Props> = ({ close }) => {
  const form = useForm<CreateFacilityPayload>({
    initialValues: {
      name: '',
      description: '',
      image: ''
    },
    validate: {
      name: isNotEmpty('Không được để trống'),
      description: isNotEmpty('Không được để trống')
    }
  });

  const [previewImage, setPreviewImage] = useState<FileWithPath>();
  const [isLoadingUpload, , handleUploadImageOnFirebase] = useUploadFirebase();

  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const handleSubmit = (value: CreateFacilityPayload) => {
    dispatch(
      FacilityActions.createFacility(value, {
        onSuccess: () => {
          dispatch(FacilityActions.getAllFacilities());
          close();
        }
      })
    );
  };
  return (
    <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
      <Stack spacing={'md'}>
        <TextInput
          label="Tên cơ sở vật chất"
          placeholder="Tên"
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Mô tả"
          placeholder="Mô tả"
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
            </Group>
          </Dropzone>
        </Stack>

        <Group position="right">
          <Button type="submit" loading={isLoadingUpload}>
            Thêm mới
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
