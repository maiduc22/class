import { ROUTER } from '@/configs/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserGenderDict, IUserStatusDict } from '@/types/models/IUser';
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
import { IconInfoCircle } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalAddUser } from './components/ModalAddUser';

export const User = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootState) => state.user);

  const [_records, setRecords] = useState(users);

  useEffect(() => setRecords(users), [users]);

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'employeeCode', title: 'Mã nhân sự' },
    { accessor: 'fullName', title: 'Họ tên' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phoneNumber', title: 'Số điện thoại' },
    { accessor: 'dayOfBirth', title: 'Ngày sinh' },
    {
      accessor: 'gender',
      title: 'Giới tính',
      render: ({ gender }) => {
        return IUserGenderDict[gender].label;
      }
    },
    {
      accessor: 'status',
      title: 'Trạng thái',
      render: ({ status }) => {
        return (
          <Badge color={IUserStatusDict[status].color}>
            {IUserStatusDict[status].label}
          </Badge>
        );
      }
    },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '100px',
      render: ({ id }) => (
        <Group position="center">
          <Tooltip label="Xem thông tin chi tiết">
            <IconInfoCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => navigate(`${ROUTER.USER}/${id}`)}
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
          <Input placeholder="Tìm kiếm theo tên" />
          <Button onClick={openAddModal}>Thêm nhân sự</Button>
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
        title="Tạo mới nhân sự"
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddUser closeModal={closeAddModal} />
      </Modal>
    </>
  );
};
