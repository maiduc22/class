import usePagination from '@/hooks/use-pagination';
import { IAttendance } from '@/types/models/IAttendance';
import { Group, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';

export const Attendance = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_attendance, setAttendance] = useState<IAttendance[]>([]);
  const columns: DataTableColumn<IAttendance>[] = [
    {
      accessor: 'date',
      title: 'Ngày'
    },
    {
      accessor: 'checkin',
      title: 'Giờ vào làm'
    },
    {
      accessor: 'checout',
      title: 'Giờ tan làm'
    },
    {
      accessor: 'note',
      title: 'Ghi chú'
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _attendance,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });
  return (
    <Stack>
      <Group>
        <Text fw={600} fz={'lg'}>
          Bảng chấm công
        </Text>
      </Group>

      <DataTable
        minHeight={300}
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        columns={columns}
        records={records}
        totalRecords={_attendance?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};
