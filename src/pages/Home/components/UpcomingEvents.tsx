import {
  Card,
  CardSection,
  Col,
  Grid,
  Group,
  Text,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import {
  IconCake,
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconTimelineEvent
} from '@tabler/icons-react';
import {
  addDays,
  addWeeks,
  format,
  getWeek,
  isSameDay,
  lastDayOfWeek,
  startOfWeek,
  subWeeks
} from 'date-fns';
import { useState } from 'react';

export const UpcomingEvents = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };
  const theme = useMantineTheme();
  const renderHeader = () => {
    const dateFormat = 'MMM d';
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = addDays(startDate, 6); // Calculate the end date by adding 6 days to the start date
    const headerText = `${format(startDate, dateFormat)} – ${format(
      endDate,
      dateFormat
    )}, ${format(currentMonth, 'yyyy')}`;

    return (
      <Grid align="center">
        <Col span={4}>
          <Group position="left" spacing={'xs'}>
            <IconCalendarEvent
              size={'2rem'}
              style={{
                background: `${theme.colors.blue[7]}`,
                borderRadius: '50%',
                padding: '5px'
              }}
              color="white"
            />
            <Text fw={'bold'} fz={'md'}>
              Sự kiện sắp tới
            </Text>
          </Group>
        </Col>
        <Col span={4}>
          <Group position="center" spacing={'xs'}>
            <IconChevronLeft
              size={'1rem'}
              onClick={() => changeWeekHandle('prev')}
            />
            <Text fw={'bold'}>{headerText}</Text>
            <IconChevronRight
              size={'1rem'}
              onClick={() => changeWeekHandle('next')}
            />
          </Group>
        </Col>
        <Col span={4}>
          <Group position="right">
            <Tooltip label="Xem toàn bộ lịch">
              <IconExternalLink cursor={'pointer'} />
            </Tooltip>
          </Group>
        </Col>
      </Grid>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'EEE d';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <Col span={'auto'} h={150}>
            <Card p={'xs'} h={'100%'} withBorder radius={0}>
              <CardSection
                withBorder
                p={'sm'}
                sx={{ border: '1px solid black' }}
                bg={'gray.1'}
              >
                <Text
                  align="center"
                  fw={isSameDay(day, new Date()) ? 'bold' : ''}
                  fz={'md'}
                  color={isSameDay(day, new Date()) ? 'blue' : 'dimmed'}
                >
                  {formattedDate}
                </Text>
              </CardSection>
            </Card>
          </Col>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid w={'100%'} gutter={0}>
          {days}
        </Grid>
      );
      days = [];
    }
    return (
      <Group w={'full'} mt={'xl'}>
        {rows}
      </Group>
    );
  };
  return (
    <Card withBorder w={'100%'} p={'xl'} shadow={'xs'}>
      {renderHeader()}
      {renderCells()}
      <Group spacing={'xl'} mt={'xl'}>
        <Group spacing={'xs'}>
          <IconTimelineEvent
            size={'1.2rem'}
            style={{
              background: 'white',
              borderRadius: '50%',
              border: '2px solid blue',
              padding: '2px'
            }}
            color="blue"
            cursor={'pointer'}
          />
          <Text fz={'xs'}>Ngày kỉ niệm</Text>
        </Group>
        <Group spacing={'xs'}>
          <IconCake
            size={'1.2rem'}
            style={{
              background: 'white',
              borderRadius: '50%',
              border: '2px solid blue',
              padding: '2px'
            }}
            color="blue"
            cursor={'pointer'}
          />
          <Text fz={'xs'}>Sinh nhật</Text>
        </Group>
      </Group>
    </Card>
  );
};
