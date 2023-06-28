import { RequestTimeoffPayload } from '@/configs/api/payload';
import { useAppDispatch } from '@/hooks/redux';
import { TimeoffActions } from '@/redux/reducers/timeoff/timeoff.action';
import {
  IRequest,
  IRequestStatus,
  IRequestStatusDict,
  IRequestType,
  IRequestTypeDict
} from '@/types/models/IRequest';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  FileInput,
  Grid,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
  useMantineTheme
} from '@mantine/core';
import { DateInput, DateValue, TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArticle,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconDotsDiagonal,
  IconFileUpload,
  IconNewSection,
  IconNote,
  IconPaperclip,
  IconPlane
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useRef, useState } from 'react';

export const MyRequests = () => {
  const theme = useMantineTheme();
  const columns: DataTableColumn<IRequest>[] = [
    {
      accessor: 'from',
      title: 'Từ'
    },
    {
      accessor: 'to',
      title: 'Tới'
    },
    {
      accessor: 'total',
      title: 'Tổng thời gian'
    },
    {
      accessor: 'type',
      title: 'Loại'
    },
    {
      accessor: 'achivement',
      title: 'Đính kèm'
    },
    {
      accessor: '',
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
      render: () => {
        return (
          <Group>
            <IconFileUpload size={'1rem'} />
            <IconDotsDiagonal size={'1rem'} />
          </Group>
        );
      }
    }
  ];

  const TypeSelectData = Object.values(IRequestType);
  const StatusSelectData = Object.values(IRequestStatus);
  const [openned, { close, open }] = useDisclosure();

  return (
    <>
      <Card withBorder p={'lg'} shadow={'xs'}>
        <Group spacing={'xs'} mb={'md'}>
          <IconArticle
            size={'2rem'}
            style={{
              background: `${theme.colors.blue[7]}`,
              borderRadius: '50%',
              padding: '5px'
            }}
            color="white"
          />
          <Text fw={600} fz={'xl'}>
            Yêu cầu cá nhân
          </Text>
        </Group>

        <Group align="end" position="apart">
          <Group>
            <Select
              label="Loại yêu cầu"
              data={TypeSelectData.map((type) => ({
                value: type,
                label: IRequestTypeDict[type].label
              }))}
              defaultValue={IRequestType.ALL}
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
              defaultValue={IRequestType.ALL}
              rightSection={<IconChevronDown size="1rem" color="blue" />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
            />
            <DateInput
              label="Từ ngày"
              rightSection={<IconCalendar size="0.9rem" color="blue" />}
            />
            <DateInput
              label="Từ ngày"
              rightSection={<IconCalendar size="0.9rem" color="blue" />}
            />
          </Group>
          <Button leftIcon={<IconNewSection size={'1rem'} />} onClick={open}>
            Tạo yêu cầu
          </Button>
        </Group>

        <DataTable minHeight={200} striped highlightOnHover columns={columns} />
      </Card>

      <Modal
        title={<Text>Tạo yêu cầu</Text>}
        centered
        opened={openned}
        onClose={close}
        size={'1000px'}
      >
        <ModalAddRequest close={close} />
      </Modal>
    </>
  );
};

interface Props {
  close: () => void;
}

export const ModalAddRequest = ({ close }: Props) => {
  const [_isSingleDay, setIsSingleDay] = useState(true);
  const [_dateFrom, setDateFrom] = useState<DateValue>();
  const [_dateTo, setDateTo] = useState<DateValue>();
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(0);

  const form = useForm<RequestTimeoffPayload>({
    initialValues: {
      type: '',
      dateFrom: '',
      dateTo: '',
      note: '',
      fileId: '',
      start: 0,
      end: 0,
      dayoff: 0
    },
    validate: {
      type: isNotEmpty('Vui lòng lựa chọn loại yêu cầu'),
      dateFrom: isNotEmpty('Thời gian bắt đầu không được bỏ trống'),
      dateTo: isNotEmpty('Thời gian kết thúc không được bỏ trống')
    }
  });

  const calculateDayoff = () => {
    if (_isSingleDay) {
      return Number(((_end - _start) / (8 * 60 * 60)).toFixed(2));
    } else {
      return dayjs(_dateTo).diff(_dateFrom, 'day');
    }
  };

  const handleChangeDateFrom = (value: DateValue) => {
    setDateFrom(value);
    form.values.dateFrom = dayjs(value).format('YYYY-MM-DD').toString();
  };
  const handleChangeDateTo = (value: DateValue) => {
    setDateTo(value);
    form.values.dateTo = dayjs(value).format('YYYY-MM-DD').toString();
  };

  const renderMultiDaysSelect = () => {
    return (
      <Stack>
        <Group position="apart">
          <Group>
            <Text w={30}>Từ</Text>
            <DateInput
              rightSection={<IconCalendar size="0.9rem" color="blue" />}
              onChange={(value) => handleChangeDateFrom(value)}
              minDate={new Date()}
            />
          </Group>
          {dayjs(_dateTo).diff(_dateFrom, 'day') > 0 ? (
            <Text>
              {`Tổng thời gian: ${dayjs(_dateTo).diff(_dateFrom, 'day')} ngày`}
            </Text>
          ) : null}
        </Group>
        <Group>
          <Text w={30}>Đến</Text>
          <DateInput
            rightSection={<IconCalendar size="0.9rem" color="blue" />}
            onChange={(value) => handleChangeDateTo(value)}
            minDate={dayjs(_dateFrom).add(1, 'day').toDate()}
          />
        </Group>
      </Stack>
    );
  };

  const refStart = useRef<HTMLInputElement>(null);
  const refEnd = useRef<HTMLInputElement>(null);

  const combineDateAndTime = (date: string, time: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const combinedDate = new Date(year, month - 1, day, hours, minutes);
    const combinedTimeInSeconds = combinedDate.getTime() / 1000;

    return combinedTimeInSeconds;
  };

  const renderSingleDaySelect = () => {
    return (
      <Group>
        <Group>
          <DateInput
            rightSection={<IconCalendar size="0.9rem" color="blue" />}
            onChange={(value) => {
              handleChangeDateFrom(value);
              handleChangeDateTo(value);
            }}
            minDate={new Date()}
            max={'80px'}
          />
          <TimeInput
            ref={refStart}
            rightSection={
              <ActionIcon onClick={() => refStart.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            maw={400}
            onChange={(value) => {
              const time = value.currentTarget.value;
              setStart(combineDateAndTime(form.values.dateFrom, time));
              form.values.start = combineDateAndTime(
                form.values.dateFrom,
                time
              );
            }}
          />
          <Text>Tới</Text>
          <TimeInput
            ref={refEnd}
            rightSection={
              <ActionIcon onClick={() => refEnd.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            maw={400}
            onChange={(value) => {
              const time = value.currentTarget.value;
              setEnd(combineDateAndTime(form.values.dateFrom, time));
              form.values.end = combineDateAndTime(form.values.dateFrom, time);
            }}
          />
        </Group>
      </Group>
    );
  };
  const dispatch = useAppDispatch();

  const handleSubmit = (values: RequestTimeoffPayload) => {
    dispatch(
      TimeoffActions.requestTimeoff(
        { ...values, dayoff: calculateDayoff() },
        {
          onSuccess: () => {
            close();
          }
        }
      )
    );
  };

  return (
    <form
      id="request-timeoff"
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <Stack spacing={'lg'}>
        <Grid align="center">
          <Col span={1}>
            <IconPlane size={'1.5rem'} />
          </Col>
          <Col span={10} offset={1}>
            <Select
              data={Object.values(IRequestType)
                .filter((type) => type !== IRequestType.ALL)
                .map((type) => ({
                  value: type,
                  label: IRequestTypeDict[type].label
                }))}
              placeholder="Chọn loại yêu cầu"
              {...form.getInputProps('type')}
            />
          </Col>
        </Grid>

        <Grid align="center">
          <Col span={1}>
            <IconClock size={'1.5rem'} />
          </Col>
          <Col span={10} offset={1}>
            <Group spacing={'lg'}>
              <Card p={'xs'}>
                <Checkbox
                  size={'sm'}
                  label="Nghỉ trong ngày"
                  labelPosition="right"
                  radius={'xl'}
                  checked={_isSingleDay}
                  onChange={() => setIsSingleDay(!_isSingleDay)}
                />
              </Card>
              <Card p={'xs'}>
                <Checkbox
                  size={'sm'}
                  label="Nghỉ dài ngày"
                  labelPosition="right"
                  radius={'xl'}
                  checked={!_isSingleDay}
                  onChange={() => setIsSingleDay(!_isSingleDay)}
                />
              </Card>
            </Group>
          </Col>
        </Grid>

        <Grid>
          <Col offset={2} span={10}>
            {!_isSingleDay ? renderMultiDaysSelect() : renderSingleDaySelect()}
          </Col>
        </Grid>

        <Grid align="center">
          <Col span={1}>
            <IconNote size={'1.5rem'} />
          </Col>
          <Col span={10} offset={1}>
            <Textarea placeholder="Ghi chú (có thể để trống)" />
          </Col>
        </Grid>

        <Grid align="center">
          <Col span={1}>
            <IconPaperclip size={'1.5rem'} />
          </Col>
          <Col span={10} offset={1}>
            <FileInput placeholder="Tải tệp đính kém (có thể bỏ qua)" />
          </Col>
        </Grid>
        <Group position="right">
          <Button type={'submit'} form="request-timeoff">
            Tạo yêu cầu
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
