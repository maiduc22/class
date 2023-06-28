import { useAppDispatch } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { TimeoffActions } from '@/redux/reducers/timeoff/timeoff.action';
import { IBalance } from '@/types/models/IBalance';
import { IRequestType, IRequestTypeDict } from '@/types/models/IRequest';
import { Card, Group, Select, Text, useMantineTheme } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  IconArticle,
  IconCalendar,
  IconChevronDown
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useCallback, useEffect, useState } from 'react';

export const BalanceHistory = () => {
  const dispatch = useAppDispatch();
  const [_balanceHistory, setBalanceHistory] = useState<IBalance[]>();

  const getBalanceHistory = useCallback(() => {
    dispatch(
      TimeoffActions.getBalanceHistory({
        onSuccess: (data: IBalance[]) => {
          setBalanceHistory(data);
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getBalanceHistory();
  }, [getBalanceHistory]);

  const [_filteredBalanceHistory, setFilteredBalanceHistory] = useState<
    IBalance[]
  >([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [requestType, setRequestType] = useState<IRequestType>(
    IRequestType.ALL
  );

  useEffect(() => {
    if (!_balanceHistory) return;
    const filteredData = _balanceHistory.filter((balance: IBalance) => {
      if (
        startDate &&
        endDate &&
        (dayjs(balance.date).toDate() < startDate ||
          dayjs(balance.date).toDate() > endDate)
      ) {
        return false;
      }
      if (requestType !== IRequestType.ALL && balance.type !== requestType) {
        return false;
      }
      return true;
    });
    setFilteredBalanceHistory(filteredData);
  }, [_balanceHistory, startDate, endDate, requestType]);

  const columns: DataTableColumn<IBalance>[] = [
    {
      accessor: 'date',
      title: 'Ngày'
    },
    {
      accessor: 'event',
      title: 'Sự kiện'
    },
    {
      accessor: 'type',
      title: 'Loại',
      render: ({ type }) => {
        return <Text>{IRequestTypeDict[type].label}</Text>;
      }
    },
    {
      accessor: 'changedBy',
      title: 'Người thay đổi'
    },
    {
      accessor: 'changeDays',
      title: 'Thay đổi (ngày)'
    }
  ];

  const theme = useMantineTheme();
  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _filteredBalanceHistory,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });
  return (
    <Card withBorder p={'lg'} shadow={'xs'}>
      <Group mb={'lg'}>
        <IconArticle
          size={'2rem'}
          style={{
            background: `${theme.colors.blue[7]}`,
            borderRadius: '50%',
            padding: '5px'
          }}
          color="white"
        />
        <Text fw={600} fz={'lg'}>
          Lịch sử số dư
        </Text>
      </Group>

      <Group mb={'lg'}>
        <DateInput
          clearable
          label="Từ"
          value={startDate}
          onChange={setStartDate}
          rightSection={<IconCalendar size="0.9rem" color="blue" />}
        />

        <DateInput
          clearable
          label="Đến"
          value={endDate}
          onChange={setEndDate}
          rightSection={<IconCalendar size="0.9rem" color="blue" />}
        />

        <Select
          label="Loại"
          value={requestType}
          onChange={(value: string | null) =>
            setRequestType(value as IRequestType)
          }
          data={Object.values(IRequestType).map((type) => ({
            value: type,
            label: IRequestTypeDict[type].label
          }))}
          rightSection={<IconChevronDown size="1rem" color="blue" />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          w={'150px'}
        />
      </Group>

      <DataTable
        minHeight={200}
        striped
        highlightOnHover
        columns={columns}
        records={records}
        totalRecords={_filteredBalanceHistory?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Card>
  );
};
