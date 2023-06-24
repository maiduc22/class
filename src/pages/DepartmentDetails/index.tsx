import { IUser, IUserGenderDict, IUserStatusDict } from '@/types/models/IUser';
import { Badge, Button, Grid, Group, Stack, Text } from '@mantine/core';
import {
  IconEditCircle,
  IconInfoCircle,
  IconUserPlus
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';

export const DepartmentDetails = () => {
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
        Thông tin phòng ban
      </Text>
      <Grid gutter={'md'}>
        <Grid.Col span={4}>
          {renderLabelandValue('Mã phòng ban', 'DEPART123')}
        </Grid.Col>
        <Grid.Col span={4}>
          {renderLabelandValue('Tên phòng ban', 'Phòng Kinh Doanh')}
        </Grid.Col>
        <Grid.Col span={4}>
          {renderLabelandValue('Phòng ban cha', 'Phòng Kế Hoạch')}
        </Grid.Col>
        <Grid.Col span={12}>{renderLabelandValue('Mô tả', 'Mô tả')}</Grid.Col>
      </Grid>
      <Group position="apart">
        <Text fw={600} size={'lg'}>
          Danh sách nhân sự
        </Text>
        <Button leftIcon={<IconUserPlus size={'1rem'} />}>Thêm nhân sự</Button>
      </Group>
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
