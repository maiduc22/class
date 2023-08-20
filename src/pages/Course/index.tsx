import usePagination from '@/hooks/use-pagination';
import { DateParser, ICourse } from '@/types/models/ICourse';
import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';

export const Course = () => {
  const [_records, setRecords] = useState<ICourse[]>([]);

  const column: DataTableColumn<ICourse>[] = [
    {
      accessor: 'name',
      title: 'Tên khoá học'
    },
    {
      accessor: 'description',
      title: 'Mô tả'
    },
    {
      accessor: 'teacher',
      title: 'Giáo viên'
    },
    {
      accessor: 'room',
      title: 'Phòng học'
    },
    {
      accessor: '',
      title: 'Lịch học',
      render: (record) => (
        <Group>
          {record.timeTables.map((timeTable) => (
            <Badge>
              {DateParser(timeTable.inDate)}: {timeTable.hourStart}:
              {timeTable.minuteStart} - {timeTable.hourEnd}:
              {timeTable.minuteEnd}
            </Badge>
          ))}
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
    <Stack spacing={'lg'}>
      <Group position="apart">
        <Text fw={500} fz={'lg'}>
          Quản lý khoá học
        </Text>
        <Button>Thêm khoá học</Button>
      </Group>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={column}
        records={records}
        totalRecords={_records?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};
