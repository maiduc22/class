import { CreateRoomPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { IRoom } from '@/types/models/IRoom';
import {
  Button,
  Group,
  Image,
  NumberInput,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  close: () => void;
  room: IRoom | undefined;
}

export const ModalUpdateRoom: React.FC<Props> = ({ close, room }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const getRoomByID = useCallback(() => {
    if (room) {
      dispatch(
        RoomActions.getRoomById(room.id, {
          onSuccess: (data: IRoom) => {
            const facilities = data.facilities
              .filter((item) => item.qty && item.qty > 0)
              .map((item) => {
                return { id: item.id, qty: item.qty };
              });
            form.setFieldValue('facilities', facilities);
          }
        })
      );
    }
  }, [dispatch, room]);

  useEffect(() => {
    getRoomByID();
  }, [getRoomByID]);

  const form = useForm<CreateRoomPayload>({
    initialValues: {
      name: room?.name || '',
      description: room?.description || '',
      capacity: room?.capacity || 0,
      image: room?.image || ''
    },
    validate: {
      name: isNotEmpty('Không được để trống'),
      description: isNotEmpty('Không được để trống')
    }
  });

  const [previewImage, setPreviewImage] = useState<FileWithPath>();
  const [isLoadingUpload, , handleUploadImageOnFirebase] = useUploadFirebase();

  const handleSubmit = (value: CreateRoomPayload) => {
    dispatch(
      RoomActions.updateRoom(room?.id || '', value, {
        onSuccess: () => {
          dispatch(RoomActions.getAllRooms());
          close();
        }
      })
    );
  };
  return (
    <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
      <Stack spacing={'md'}>
        <TextInput
          label="Tên phòng học"
          placeholder="Tên phòng học"
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Mô tả"
          placeholder="Mô tả"
          {...form.getInputProps('description')}
        />

        <NumberInput
          label="Số chỗ ngồi"
          placeholder=""
          {...form.getInputProps('capacity')}
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
                  {room?.image ? (
                    <Stack spacing={0} align="center">
                      <Image src={room?.image} />
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

        <Group position="right">
          <Button type="submit" loading={isLoadingUpload}>
            Cập nhật
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
