import { ModalAddNotification } from './components/ModalAddNotification';
// import { ModalUpdateNotification } from '@/components/modal/notification/ModalUpdateNotification';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { NotificationActions } from '@/redux/reducers/notification/notification.action';
import { INotification } from '@/types/models/INotification';
import { Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconDownload,
  IconEditCircle,
  IconInfoCircle,
  IconPlus,
  IconTrash
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ModalDetailsNotification } from './components/ModalDetailsModal';
import { ModalUpdateNotification } from './components/ModalUpdateNotification';

export const handleDownloadFile = (url: string | undefined) => {
  console.log(url);
  if (url) {
    // const lastSlashIndex = url.lastIndexOf('/');
    // const fileNameWithToken = url.substring(lastSlashIndex + 1);
    // const questionMarkIndex = fileNameWithToken.indexOf('?');
    // const fileName = fileNameWithToken.substring(0, questionMarkIndex);

    // // Extract the extension from the file name
    // const lastDotIndex = fileName.lastIndexOf('.');
    // const extension = fileName.substring(lastDotIndex + 1);

    const encodedFilenameParts = url.split('%2F');

    // Get the last part, which contains the encoded filename
    const encodedFilename =
      encodedFilenameParts[encodedFilenameParts.length - 1];

    // Decode the encoded filename
    const decodedFilename = decodeURIComponent(encodedFilename);
    const urlParts = decodedFilename.split('+');

    // Get the first part, which contains the filename
    const filenamePart = urlParts[0];

    // Trim any leading/trailing spaces
    const filename = filenamePart.trim();

    console.log(filename);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    // Define the onload event handler
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${filename}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error('File download failed:', xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.error('File download failed:', xhr.statusText);
    };
    xhr.open('GET', url);
    xhr.send();
  } else {
    console.error('Could not determine the file extension from the URL:', url);
  }
};

export const Notification = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(NotificationActions.getAllNotifications());
  }, []);

  const { notifications } = useAppSelector(
    (state: RootState) => state.notification
  );
  const [_notifications, setNotifications] =
    useState<INotification[]>(notifications);

  useEffect(() => setNotifications(notifications), [notifications]);

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const [
    openedDetailsModal,
    { open: openDetailsModal, close: closeDetailsModal }
  ] = useDisclosure();
  const [selectedNotification, setSelectedNotification] =
    useState<INotification>();

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Xác nhận xoá thông báo',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          NotificationActions.deleteNotification(id, {
            onSuccess: () => {
              dispatch(NotificationActions.getAllNotifications());
            }
          })
        );
      }
    });
  };

  const column: DataTableColumn<INotification>[] = [
    {
      accessor: 'title',
      title: 'Tiêu đề',
      textAlignment: 'center'
    },
    {
      accessor: 'content',
      title: 'Nội dung',
      textAlignment: 'center'
    },
    {
      accessor: 'file',
      title: 'File đính kèm',
      textAlignment: 'center',
      render: ({ fileUrls }) => {
        return fileUrls[0] ? (
          <Button
            variant="outline"
            leftIcon={<IconDownload size={'1rem'} />}
            size="xs"
            onClick={() => handleDownloadFile(fileUrls[0])}
          >
            Tải xuống
          </Button>
        ) : null;
      }
    },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '',
      render: (record) => (
        <Group position="center">
          <Tooltip label="Chi tiết">
            <IconInfoCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedNotification(record);
                openDetailsModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Sửa ">
            <IconEditCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedNotification(record);
                openEditModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Xoá">
            <IconTrash
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                handleDelete(record.id);
              }}
            />
          </Tooltip>
        </Group>
      )
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _notifications,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  return (
    <>
      {' '}
      <Stack spacing={'lg'}>
        <Group position="apart">
          <Text fw={500} fz={'lg'}>
            Quản lý thông báo
          </Text>
          <Button leftIcon={<IconPlus size={'1rem'} />} onClick={openAddModal}>
            Thêm
          </Button>
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={column}
          records={records}
          totalRecords={_notifications?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal
        centered
        title={<Text fw={500}>Thêm mới thông báo</Text>}
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddNotification close={closeAddModal} />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Chi tiết thông báo</Text>}
        opened={openedDetailsModal}
        onClose={closeDetailsModal}
        size={'lg'}
      >
        <ModalDetailsNotification
          close={closeDetailsModal}
          id={selectedNotification?.id || ''}
        />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Cập nhật thông báo</Text>}
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalUpdateNotification
          close={closeEditModal}
          noti={selectedNotification}
        />
      </Modal>
    </>
  );
};
