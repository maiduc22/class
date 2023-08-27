import { ModalAddFacility } from '@/components/modal/facility/ModalAddFacility';
import { ModalUpdateFacility } from '@/components/modal/facility/ModalUpdateFacility';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { FacilityActions } from '@/redux/reducers/facility/facility.action';
import { IFacility } from '@/types/models/IFacility';
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
import { IconEditCircle, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';

export const Facility = () => {
  const dispatch = useAppDispatch();
  const { facilities } = useAppSelector((state: RootState) => state.facility);
  const [_facilities, setFacilities] = useState<IFacility[]>(facilities);

  useEffect(() => setFacilities(facilities), [facilities]);

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();
  const [selectedFacility, setSelectedFacility] = useState<IFacility>();

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Xác nhận xoá cơ sở vật chất',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          FacilityActions.deleteFacility(id, {
            onSuccess: () => {
              dispatch(FacilityActions.getAllFacilities());
            }
          })
        );
      }
    });
  };

  const column: DataTableColumn<IFacility>[] = [
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
      accessor: 'image',
      title: 'Hình ảnh',
      textAlignment: 'center',
      render: (record) => (
        <Center>
          <Image src={record.image || ''} width={150} height={150} />
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
          <Tooltip label="Sửa thông tin">
            <IconEditCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedFacility(record);
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
    data: _facilities,
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
            Quản lý Cơ Sở Vật Chất
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
          totalRecords={_facilities?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal
        centered
        title={<Text fw={500}>Thêm mới cơ sở vật chất</Text>}
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddFacility close={closeAddModal} />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Cập nhật cơ sở vật chất</Text>}
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalUpdateFacility
          close={closeEditModal}
          facility={selectedFacility}
        />
      </Modal>
    </>
  );
};
