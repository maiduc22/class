import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { RoleActions } from '@/redux/reducers/role/role.action';
import { IRole, IRoleStatusDict } from '@/types/models/IRole';
import {
  Badge,
  Button,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconEdit,
  IconFilePower,
  IconStatusChange,
  IconTrash
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ModalAddRole } from './components/ModalAddRole';
import { ModalAssignPermission } from './components/ModalAssignPermission';
import { ModalUpdateRole } from './components/ModalUpdateRole';

export const Role = () => {
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state: RootState) => state.role);
  const [_records, setRecords] = useState(roles);
  const [_selectedRecord, setSelectedRecord] = useState<IRole | null>(null);

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] =
    useDisclosure();
  const [
    openedUpdateModal,
    { close: closeUpdateModal, open: openUpdateModal }
  ] = useDisclosure();
  const [
    openedAssignModal,
    { close: closeAssignModal, open: openAssignModal }
  ] = useDisclosure();

  useLayoutEffect(() => {
    dispatch(RoleActions.getAllRole());
  }, [dispatch]);

  useEffect(() => setRecords(roles), [roles]);

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

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    modals.openConfirmModal({
      title: 'Xác nhận xoá vai trò',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          RoleActions.deleteStatus(id, {
            onSuccess: () => dispatch(RoleActions.getAllRole())
          })
        );
      }
    });
  };

  const handleToggleStatus = (id: string | undefined) => {
    if (!id) return;
    dispatch(
      RoleActions.toggleStatus(id, {
        onSuccess: () => dispatch(RoleActions.getAllRole())
      })
    );
  };

  const handleUpdate = (role: IRole) => {
    setSelectedRecord(role);
    openUpdateModal();
  };

  const handleAssign = (role: IRole) => {
    setSelectedRecord(role);
    openAssignModal();
  };

  const columns: DataTableColumn<IRole>[] = [
    { accessor: 'code', title: 'Mã' },
    { accessor: 'name', title: 'Tên' },
    { accessor: 'description', title: 'Mô tả' },
    {
      accessor: 'status',
      title: 'Trạng thái',
      render: ({ status }) => {
        return (
          <Badge color={IRoleStatusDict[status].color}>
            {IRoleStatusDict[status].label}
          </Badge>
        );
      }
    },
    {
      accessor: '',
      title: '',
      render: (role: IRole) => {
        return (
          <Group position="center">
            <Tooltip label="Thay đổi trạng thái">
              <IconStatusChange
                size={'1rem'}
                cursor={'pointer'}
                onClick={() => handleToggleStatus(role.id)}
              />
            </Tooltip>
            <Tooltip label="Cập nhật">
              <IconEdit
                size={'1rem'}
                cursor={'pointer'}
                onClick={() => handleUpdate(role)}
              />
            </Tooltip>
            <Tooltip label="Xoá">
              <IconTrash
                cursor={'pointer'}
                size={'1rem'}
                onClick={() => handleDelete(role.id)}
              />
            </Tooltip>
            <Tooltip label="Cập nhật quyền">
              <IconFilePower
                cursor={'pointer'}
                size={'1rem'}
                onClick={() => handleAssign(role)}
              />
            </Tooltip>
          </Group>
        );
      }
    }
  ];

  return (
    <>
      <Stack>
        <Text fw={600} size={'lg'}>
          Danh sách vai trò
        </Text>
        <Group position="apart">
          <Input placeholder="Tìm theo tên" />
          <Button onClick={openAddModal}>Thêm mới</Button>
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          striped
          withColumnBorders
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={_records.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal
        centered
        title="Thêm vai trò"
        opened={openedAddModal}
        onClose={closeAddModal}
      >
        <ModalAddRole close={closeAddModal} />
      </Modal>

      <Modal
        centered
        title="Cập nhật vai trò"
        opened={openedUpdateModal}
        onClose={closeUpdateModal}
      >
        <ModalUpdateRole close={closeUpdateModal} role={_selectedRecord} />
      </Modal>

      <Modal
        centered
        title={`Phân quyền cho vai trò ${_selectedRecord?.name}`}
        opened={openedAssignModal}
        onClose={closeAssignModal}
      >
        <ModalAssignPermission
          close={closeAssignModal}
          role={_selectedRecord}
        />
      </Modal>
    </>
  );
};
