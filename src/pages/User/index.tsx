import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser } from '@/types/models/IUser';
import {
  Button,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ModalAddUser } from './components/ModalAddUser';
import { ModalEditUser } from './components/ModalEditUser';

export const User = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootState) => state.user);

  const [_records, setRecords] = useState(users);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(
    () =>
      setRecords(
        users.filter((user) => {
          if (debounceQuery !== '') {
            if (
              user.fullName.toLowerCase().includes(debounceQuery.toLowerCase())
            ) {
              return true;
            }
          } else {
            return true;
          }
        })
      ),
    [users, debounceQuery]
  );
  const [_selectedUser, SetSelectedUser] = useState<IUser>();
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'username', title: 'Tên tài khoản' },
    { accessor: 'fullName', title: 'Họ tên' },
    { accessor: 'phoneNumber', title: 'Số điện thoại' },
    { accessor: 'dayOfBirth', title: 'Ngày sinh' },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '100px',
      render: (record) => (
        <Group position="center">
          <Tooltip label="Sửa thông tin tài khoản">
            <IconEdit
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                SetSelectedUser(record);
                openEditModal();
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
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  return (
    <>
      <Stack>
        <Text fw={600} size={'lg'}>
          Danh sách nhân sự
        </Text>
        <Group position="apart">
          <Input
            placeholder="Tìm kiếm theo họ tên"
            miw={300}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Group>
            <Button onClick={openAddModal}>Tạo tài khoản</Button>
          </Group>
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
        />
      </Stack>

      <Modal
        centered
        title="Tạo tài khoản"
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddUser closeModal={closeAddModal} />
      </Modal>

      <Modal
        centered
        title="Cập nhật tài khoản"
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalEditUser closeModal={closeEditModal} user={_selectedUser} />
      </Modal>
    </>
  );
};
