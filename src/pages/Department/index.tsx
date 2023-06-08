import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { DepartmentActions } from '@/redux/reducers/department/department.action';
import { IDepartment } from '@/types/models/IDepartment';
import { Button, Group, Input, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import ModalCreateDepartment from './components/ModalCreateDepartment';
import ModalUpdateDepartment from './components/ModalUpdateDepartment';

const Department: React.FC = () => {
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector(
    (state: RootState) => state.department
  );
  const [_records, setRecords] = useState(departments);
  const [_selectedRecord, setSelectedRecord] = useState<IDepartment | null>(
    null
  );

  useLayoutEffect(() => {
    dispatch(DepartmentActions.getAllDepartment());
  }, [dispatch]);

  useEffect(() => setRecords(departments), [departments]);

  const columns: DataTableColumn<IDepartment>[] = [
    {
      accessor: 'code',
      title: 'Mã phòng'
    },
    {
      accessor: 'name',
      title: 'Tên phòng'
    },
    {
      accessor: 'description',
      title: 'Mô tả'
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] =
    useDisclosure();
  const [
    openedUpdateModal,
    { open: openUpdateModal, close: closeUpdateModal }
  ] = useDisclosure();

  return (
    <Stack>
      <Text fw={'bold'} size={'lg'}>
        Danh sách phòng ban
      </Text>
      <Group position={'apart'}>
        <Input placeholder="Tìm kiếm theo tên"></Input>
        <Button onClick={openAddModal}>Thêm mới</Button>
      </Group>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={columns}
        records={records}
        totalRecords={_records.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
        rowContextMenu={{
          trigger: 'click',
          items: (record) => [
            {
              key: 'update',
              color: 'blue',
              icon: <IconEdit size={16} />,
              title: 'Cập nhật thông tin',
              onClick: () => {
                setSelectedRecord(record);
                openUpdateModal();
              }
            },
            {
              key: 'delete',
              color: 'red',
              icon: <IconTrash size={16} />,
              title: 'Xoá',
              onClick: () => {
                modals.openConfirmModal({
                  title: 'Xác nhận xoá phòng ban này',
                  centered: true,
                  confirmProps: { color: 'red' },
                  labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                  onConfirm: () => {
                    if (!record.id) return;
                    dispatch(
                      DepartmentActions.deleteDepartment(record.id, {
                        onSuccess: () =>
                          dispatch(DepartmentActions.getAllDepartment())
                      })
                    );
                  }
                });
              }
            }
          ]
        }}
      />

      <Modal
        centered
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Thêm phòng ban"
      >
        <ModalCreateDepartment closeModal={closeAddModal} />
      </Modal>

      <Modal
        centered
        opened={openedUpdateModal}
        onClose={closeUpdateModal}
        title="Cập nhật thông tin phòng ban"
      >
        <ModalUpdateDepartment
          closeModal={closeUpdateModal}
          department={_selectedRecord}
        />
      </Modal>
    </Stack>
  );
};

export default Department;
