import { IUser, IUserGenderDict, IUserStatusDict } from '@/types/models/IUser';
import { Badge, Col, Grid, Group, Stack, Text } from '@mantine/core';
import { IconEditCircle, IconInfoCircle } from '@tabler/icons-react';
import { DataTableColumn, DataTable } from 'mantine-datatable';

export const RoleDetails = () => {
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
  return (
    <Stack>
      <Text fw={600} size={'lg'}>
        Thông tin vai trò
      </Text>
      <Grid gutter={'md'}>
        <Col span={2}>{renderLabelandValue('Mã vai trò', 'EHUST261')}</Col>
        <Col span={3}>{renderLabelandValue('Tên', 'Thực tập sinh')}</Col>
        <Col span={4}>
          {renderLabelandValue('Mô tả', 'Thực tập sinh có thời hạn 3 tháng ')}
        </Col>
        <Col span={3}>
          {renderLabelandValue('Trạng thái hoạt động', 'Đang hoạt động')}
        </Col>
      </Grid>
      <Text fw={600} size={'lg'}>
        Quản lý phân quyền
      </Text>
      <Text fw={600} size={'lg'}>
        Danh sách nhân sự có vai trò
      </Text>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={columns}
      />
    </Stack>
  );
};

const renderLabelandValue = (label: string, value: string) => {
  return (
    <Stack spacing={'3px'}>
      <Text fw={600} mr={'md'}>
        {label}:
      </Text>
      <Text color="dimmed">{value}</Text>
    </Stack>
  );
};
