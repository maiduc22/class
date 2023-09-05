import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { IFeedback } from '@/types/models/IFeedback';
import { Group, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';

export const Feedback = () => {
  const dispatch = useAppDispatch();
  const { feedbacks } = useAppSelector((state: RootState) => state.feedback);
  const [_feedbacks, setFeedbacks] = useState<IFeedback[]>(feedbacks);

  useEffect(() => setFeedbacks(feedbacks), [feedbacks]);

  const column: DataTableColumn<IFeedback>[] = [
    {
      accessor: 'email',
      title: 'Email',
      textAlignment: 'center'
    },
    {
      accessor: 'phoneNumber',
      title: 'Số điện thoại',
      textAlignment: 'center'
    },
    {
      accessor: 'content',
      title: 'Nôi dung',
      textAlignment: 'center'
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _feedbacks,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  return (
    <>
      {' '}
      <Stack spacing={'lg'}>
        <Group position="apart">
          <Text fw={500} fz={'lg'}>
            Quản lý Đánh Giá
          </Text>
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={column}
          records={records}
          totalRecords={_feedbacks?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
    </>
  );
};
