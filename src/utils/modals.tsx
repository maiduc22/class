import { ApiEndPointPayload } from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';
import { Button, Group, Image, ScrollArea, Stack, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';

interface OpenCustomConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  childrenText: string;
}

const openCustomConfirmModal = ({
  onConfirm,
  onCancel,
  childrenText,
  title
}: OpenCustomConfirmModalProps) => {
  modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size={'sm'}>{childrenText}</Text>,
    confirmProps: { color: 'red' },
    labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
    onCancel,
    onConfirm
  });
};

interface OpenUploadModalProps {
  title: string;
  form: UseFormReturnType<
    ApiEndPointPayload,
    (values: ApiEndPointPayload) => ApiEndPointPayload
  >;
  fieldValue: string;
  previewImage: FileWithPath | undefined;
  setPreviewImage: Dispatch<SetStateAction<FileWithPath | undefined>>;
  isLoadingUpload: boolean;
  url: string | undefined;
  handleUploadImageOnFirebase: (
    file: File,
    cb?: Callback<unknown, unknown> | undefined
  ) => void;
  onClose?: () => void;
}
const openUploadModal = ({
  title,
  previewImage,
  setPreviewImage,
  form,
  fieldValue,
  handleUploadImageOnFirebase
}: OpenUploadModalProps) => {
  modals.open({
    title,
    centered: true,
    children: (
      <Stack spacing={0}>
        <Dropzone
          onDrop={(files) => {
            setPreviewImage(files[0]);
            handleUploadImageOnFirebase(files[0], {
              onSuccess: (downloadUrl) => {
                form.setFieldValue(fieldValue, downloadUrl);
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
                // color={theme.colors[theme.primaryColor][6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size="2rem" stroke={1.5} />
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
        <Group>
          <Button
            variant="outline"
            onClick={() => {
              modals.closeAll();
              setPreviewImage(undefined); // Reset preview image
              form.resetDirty();
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              modals.closeAll();
            }}
          >
            Xác nhận
          </Button>
        </Group>
      </Stack>
    )
  });
};
export const Modals = { openCustomConfirmModal, openUploadModal };
