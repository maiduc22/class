import { FacilityCard } from '@/components/FacilityCard';
import { CreateRoomPayload } from '@/configs/api/payload';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUploadFirebase } from '@/hooks/use-upload-firebase';
import { RootState } from '@/redux/reducers';
import { FacilityActions } from '@/redux/reducers/facility/facility.action';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { SelectedFacilities } from '@/types/models/IRoom';
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
import { useDebouncedValue } from '@mantine/hooks';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';

interface Props {
  close: () => void;
}

export const ModalAddRoom: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm<CreateRoomPayload>({
    initialValues: {
      name: '',
      description: '',
      image: '',
      capacity: 0,
      facilities: []
    },
    validate: {
      name: isNotEmpty('Không được để trống'),
      description: isNotEmpty('Không được để trống'),
      capacity: isNotEmpty('Không được để trống')
    },
    transformValues: (values) => ({ ...values, facilities: selectedFacilities })
  });

  const [previewImage, setPreviewImage] = useState<FileWithPath>();
  const [isLoadingUpload, , handleUploadImageOnFirebase] = useUploadFirebase();

  useLayoutEffect(() => {
    dispatch(FacilityActions.getAllFacilities());
  }, [dispatch]);

  const { facilities } = useAppSelector((state: RootState) => state.facility);
  const [_records, setRecords] = useState(facilities);
  const [selectedFacilities, setSelectedFacilities] = useState<
    SelectedFacilities[]
  >([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      facilities.filter(({ name }) => {
        if (
          debouncedQuery !== '' &&
          !name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, facilities]);

  const handleSubmit = (value: CreateRoomPayload) => {
    dispatch(
      RoomActions.createRoom(value, {
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

          <TextInput
            mt={'md'}
            radius="md"
            label="Chọn cơ sở vật chất"
            placeholder="Nhập tên"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <ScrollArea h={350}>
            {_records.length > 0 ? (
              _records.map((item) => (
                <FacilityCard
                  key={item.id}
                  facility={item}
                  selectedFacilities={selectedFacilities}
                  setSelectedFacilities={setSelectedFacilities}
                />
              ))
            ) : (
              <Text align="center" mt={'md'} fw={600}>
                Không tìm thấy tương ứng
              </Text>
            )}
          </ScrollArea>
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
