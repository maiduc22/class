import { IClass } from '@/types/models/IClass';
import { Col, Grid, Stack, Text } from '@mantine/core';
import { CardClass } from './components/CardClass';

const fakeData: IClass[] = [
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  },
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  },
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  },
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  },
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  },
  {
    id: '1',
    name: 'Lớp Giải Tích',
    day: ['Thứ 3', 'Thứ 5'],
    room: 'P401',
    students: []
  }
];
export const TeacherDetails = () => {
  return (
    <Stack>
      <Text fw={'bold'} fz={'lg'}>
        Danh sách lớp học
      </Text>

      <Grid gutter={'lg'}>
        {fakeData.map((classInfo) => (
          <Col span={3} my={'xs'}>
            <CardClass classInfo={classInfo} />
          </Col>
        ))}
      </Grid>
    </Stack>
  );
};
