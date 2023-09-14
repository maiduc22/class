import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { DateColorParser, DateParser, TimeTable } from '@/types/models/ICourse';
import {
  Badge,
  Card,
  Center,
  Col,
  Grid,
  Group,
  Popover,
  Stack,
  Text
} from '@mantine/core';
import { IconCalendar, IconClock, IconHomeLink } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
}

export const Timetable = ({ id }: Props) => {
  const [timetable, setTimetable] = useState<
    {
      timeTables: TimeTable[];
      courseName: string;
      roomName: string;
    }[]
  >([]);

  const getTimetable = async () => {
    const api = API_URLS.Timetable.getTimetable(id);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      console.log(response.data.data);
      setTimetable(response.data.data);
      return response.data.data;
    }
  };
  useEffect(() => {
    getTimetable();
  }, []);

  const getCourseInDay = (targetDay: string) => {
    const filteredData = timetable.filter((item) =>
      item.timeTables.some((tt) => tt.inDate === targetDay)
    );

    // Extract course name, room name, and timeTables
    const result = filteredData.map((item) => ({
      courseName: item.courseName,
      roomName: item.roomName,
      timeTables: item.timeTables.filter((tt) => tt.inDate === targetDay)
    }));
    return result;
  };

  getCourseInDay('SUNDAY');
  const daysOfWeek = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ];
  return (
    <Stack>
      <Text fw={500} fz={'lg'}>
        Thời khoá biểu
      </Text>
      <Stack>
        {daysOfWeek.map((day, index) => (
          <DayCard day={day} courses={getCourseInDay(day)} />
        ))}
      </Stack>
    </Stack>
  );
};

interface Props {
  day: string;
  courses: { courseName: string; roomName: string; timeTables: TimeTable[] }[];
}

const DayCard = ({ day, courses }: Props) => {
  return (
    <Group w={'100%'}>
      <Card bg={`${DateColorParser(day)}.2`} w={100} h={100}>
        <Group align="center" position="center" h={'100%'}>
          <Text>{DateParser(day)}</Text>
        </Group>
      </Card>
      <Card h={100} radius={0} p={0}>
        <Group align="center" position="center" h={'100%'} p={0}>
          {courses.map((c) => (
            <Card
              withBorder
              bg={`${DateColorParser(day)}.2`}
              h={'100%'}
              p={'xs'}
            >
              <Stack spacing={2}>
                <Group fw={500}>Lớp {c.courseName}</Group>
                <Group spacing={2}>
                  <IconHomeLink size={'1em'} />
                  Phòng {c.courseName}
                </Group>
                <Group spacing={2}>
                  <IconClock size={'1em'} />{' '}
                  {c.timeTables[0].start?.slice(0, 5)}-
                  {c.timeTables[0].end?.slice(0, 5)}
                </Group>
              </Stack>
            </Card>
          ))}
        </Group>
      </Card>
    </Group>
  );
};
