import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserStatus } from '@/types/models/IUser';
import { Button, Group, Input, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';

interface Props {
  departmentId: string | undefined;
  close: () => void;
  getDepartmentDetails: () => void;
}
export const ModalAdduser = ({
  close,
  departmentId,
  getDepartmentDetails
}: Props) => {
  const [userList, setUserList] = useState<string[]>([]);
  const { users } = useAppSelector((state: RootState) => state.user);
  const [_users, setUsers] = useState(users);
  const [_query, setQuery] = useState('');
  const [debounceValue] = useDebouncedValue(_query, 200);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  useEffect(() => {
    setUsers(
      users.filter((user) => {
        if (debounceValue !== '') {
          if (user.fullName.includes(debounceValue)) {
            return true;
          }
        } else {
          return true;
        }
      })
    );
  }, [debounceValue, users]);

  const handleAdd = (id: string) => {
    if (userList.includes(id)) {
      const updatedUserList = userList.filter((userId) => userId !== id);
      setUserList(updatedUserList);
    } else {
      const updatedUserList = [...userList, id];
      setUserList(updatedUserList);
    }
  };

  const handleSubmit = () => {
    // dispatch(
    //   DepartmentActions.addUser(departmentId, userList, {
    //     onSuccess: () => {
    //       dispatch(UserActions.getAllUser());
    //       dispatch(DepartmentActions.getAllDepartment());
    //       getDepartmentDetails();
    //       close();
    //     }
    //   })
    // );
  };

  const handleCancel = () => {
    setUserList([]);
    close();
  };

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'employeeCode', title: 'Mã nhân sự' },
    { accessor: 'fullName', title: 'Họ tên' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phoneNumber', title: 'Số điện thoại' },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      render: ({ id }) =>
        status === IUserStatus.ACTIVE ? (
          <Group position="center">
            {!departmentId ? (
              <Button onClick={() => handleAdd(id)}>
                {userList.includes(id) ? 'Bỏ chọn' : 'Chọn'}
              </Button>
            ) : (
              <Text>Đã ở trong phòng ban khác</Text>
            )}
          </Group>
        ) : null
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _users,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });
  return (
    <Stack>
      <Text fw={600}>Danh sách toàn bộ nhân sự</Text>
      <Input
        placeholder="Nhập họ tên hoặc mã nhân sự để tìm kiếm"
        onChange={(e) => setQuery(e.target.value)}
      />
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={columns}
        records={records}
        totalRecords={_users.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
      <Group position="right">
        <Button variant="outline" onClick={handleCancel}>
          Huỷ
        </Button>
        <Button onClick={() => handleSubmit()} disabled={userList.length === 0}>
          Xác nhận
        </Button>
      </Group>
    </Stack>
  );
};
