import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserGenderDict, IUserStatusDict } from '@/types/models/IUser';
import { Badge, Button, Group, Input, Stack, Text } from '@mantine/core';
import { IconEditCircle, IconInfoCircle } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';

export const User = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(UserActions.getAllUser());
  }, [dispatch]);

  const { users } = useAppSelector((state: RootState) => state.user);

  const [_records, setRecords] = useState(users);

  useEffect(() => setRecords(users), [users]);

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
      render: () => (
        <Group position="center">
          <IconInfoCircle cursor={'pointer'} size={'1rem'} />
          <IconEditCircle cursor={'pointer'} size={'1rem'} />
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
    <Stack>
      <Text fw={600} size={'lg'}>
        Danh sách nhân sự
      </Text>
      <Group position="apart">
        <Input placeholder="Tìm kiếm theo tên" />
        <Button>Thêm nhân sự</Button>
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
  );
};
