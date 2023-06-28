import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { TimeoffActions } from '@/redux/reducers/timeoff/timeoff.action';
import {
  IRequest,
  IRequestStatus,
  IRequestStatusDict,
  IRequestType,
  IRequestTypeDict
} from '@/types/models/IRequest';
import { Badge, Group, Select, Stack, Text } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import {
  IconCalendar,
  IconChevronDown,
  IconDotsDiagonal,
  IconFileUpload
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useCallback, useEffect, useState } from 'react';

export const Requests = () => {
  const dispatch = useAppDispatch();
  const { allRequests } = useAppSelector((state: RootState) => state.timeoff);
  const [_allRequest, setAllRequest] = useState<IRequest[]>(allRequests);

  const [_startDate, setStartDate] = useState<DateValue | null>(null);
  const [_endDate, setEndDate] = useState<DateValue | null>(null);
  const [_requestType, setRequestType] = useState<IRequestType>(
    IRequestType.ALL
  );
  const [_requestStatus, setRequestStatus] = useState<IRequestStatus>(
    IRequestStatus.ALL
  );

  const getAllRequests = useCallback(() => {
    dispatch(TimeoffActions.getAllRequest());
  }, [dispatch]);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  useEffect(() => setAllRequest(allRequests), [allRequests]);

  useEffect(() => {
    const filteredData = allRequests.filter((request: IRequest) => {
      const isDateInRange =
        (!_startDate || dayjs(request.dateFrom).toDate() >= _startDate) &&
        (!_endDate || dayjs(request.dateTo).toDate() <= _endDate);

      const isTypeMatched =
        _requestType === IRequestType.ALL || request.type === _requestType;

      const isStatusMatched =
        _requestStatus === IRequestStatus.ALL ||
        request.status === _requestStatus;

      return isDateInRange && isTypeMatched && isStatusMatched;
    });
    setAllRequest(filteredData);
  }, [allRequests, _startDate, _endDate, _requestType, _requestStatus]);

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _allRequest,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  const columns: DataTableColumn<IRequest>[] = [
    {
      accessor: 'dateFrom',
      title: 'Từ'
    },
    {
      accessor: 'dateTo',
      title: 'Tới'
    },
    {
      accessor: 'dayOff',
      title: 'Tổng'
    },
    {
      accessor: 'type',
      title: 'Loại',
      render: ({ type }) => {
        return <Text>{IRequestTypeDict[type].label}</Text>;
      }
    },
    {
      accessor: 'fileId',
      title: 'Đính kèm'
    },
    {
      accessor: 'status',
      title: 'Trạng thái',
      render: (record) => {
        return (
          <Badge color={IRequestStatusDict[record.status].color}>
            {IRequestStatusDict[record.status].label}
          </Badge>
        );
      }
    },
    {
      accessor: '',
      render: (record) => {
        return (
          <Group>
            {record.fileId ? null : <IconFileUpload size={'1rem'} />}
            <IconDotsDiagonal size={'1rem'} />
          </Group>
        );
      }
    }
  ];

  const TypeSelectData = Object.values(IRequestType);
  const StatusSelectData = Object.values(IRequestStatus);

  return (
    <Stack spacing={'md'}>
      <Group>
        <Text fw={600} fz={'lg'}>
          Danh sách xin nghỉ phép
        </Text>
      </Group>
      <Group align="end" position="left">
        <DateInput
          clearable
          label="Từ"
          rightSection={<IconCalendar size="0.9rem" color="blue" />}
          value={_startDate}
          onChange={setStartDate}
        />
        <DateInput
          clearable
          label="Đến"
          rightSection={<IconCalendar size="0.9rem" color="blue" />}
          value={_endDate}
          onChange={setEndDate}
        />
        <Select
          label="Loại"
          data={TypeSelectData.map((type) => ({
            value: type,
            label: IRequestTypeDict[type].label
          }))}
          value={_requestType}
          onChange={(value: string | null) =>
            setRequestType(value as IRequestType)
          }
          rightSection={<IconChevronDown size="1rem" color="blue" />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          w={'150px'}
        />
        <Select
          label="Trạng thái"
          data={StatusSelectData.map((status) => ({
            value: status,
            label: IRequestStatusDict[status].label
          }))}
          value={_requestStatus}
          onChange={(value: string | null) =>
            setRequestStatus(value as IRequestStatus)
          }
          rightSection={<IconChevronDown size="1rem" color="blue" />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
        />
      </Group>

      <DataTable
        minHeight={300}
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        columns={columns}
        records={records}
        totalRecords={_allRequest?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};
