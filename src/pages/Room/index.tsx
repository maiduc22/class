import { ModalAddRoom } from '@/components/modal/room/ModalAddRoom';
import { ModalDetailsRoom } from '@/components/modal/room/ModalDetailsRoom';
import { ModalUpdateRoom } from '@/components/modal/room/ModalUpdateRoom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { IRoom } from '@/types/models/IRoom';
import {
  Button,
  Center,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconEditCircle,
  IconInfoCircle,
  IconPlus,
  IconTrash
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';

export const Room = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state: RootState) => state.room);
  const [_rooms, setRooms] = useState<IRoom[]>(rooms);

  useEffect(() => setRooms(rooms), [rooms]);

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const [
    openedDetailsModal,
    { open: openDetailsModal, close: closeDetailsModal }
  ] = useDisclosure();

  const [selectedRoom, setSelectedRoom] = useState<IRoom>();

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Xác nhận xoá phòng học',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          RoomActions.deleteRoom(id, {
            onSuccess: () => {
              dispatch(RoomActions.getAllRooms());
            }
          })
        );
      }
    });
  };

  const column: DataTableColumn<IRoom>[] = [
    {
      accessor: 'name',
      title: 'Tên',
      textAlignment: 'center'
    },
    {
      accessor: 'description',
      title: 'Mô tả',
      textAlignment: 'center'
    },
    {
      accessor: 'capacity',
      title: 'Số chỗ ngồi',
      textAlignment: 'center'
    },
    {
      accessor: 'image',
      title: 'Hình ảnh',
      textAlignment: 'center',
      render: (record) => (
        <Center>
          <Image
            src={record.image || ''}
            width={150}
            height={150}
            withPlaceholder
          />
        </Center>
      )
    },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '',
      render: (record) => (
        <Group position="center">
          <Tooltip label="Thông tin chi tiết">
            <IconInfoCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedRoom(record);
                openDetailsModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Sửa thông tin">
            <IconEditCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedRoom(record);
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
    data: _rooms,
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
            Quản lý Phòng Học
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
          totalRecords={_rooms?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal
        centered
        title={<Text fw={500}>Thêm mới phòng học</Text>}
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddRoom close={closeAddModal} />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Cập nhật phòng học</Text>}
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalUpdateRoom close={closeEditModal} room={selectedRoom} />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Thông tin phòng học</Text>}
        opened={openedDetailsModal}
        onClose={closeDetailsModal}
        size={'lg'}
      >
        <ModalDetailsRoom close={closeDetailsModal} id={selectedRoom?.id} />
      </Modal>
    </>
  );
};
