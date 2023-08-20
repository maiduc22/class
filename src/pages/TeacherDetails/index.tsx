import { ICourse } from '@/types/models/ICourse';
import { Center, Col, Grid, Stack, Text } from '@mantine/core';
import { CardClass } from './components/CardClass';

interface Props {
  courses: ICourse[];
}

export const TeacherDetails = ({ courses }: Props) => {
  return (
    <Stack>
      <Text fw={'bold'}>Danh sách lớp học</Text>

      <Grid gutter={'lg'}>
        {courses?.length > 0 ? (
          courses.map((classInfo) => (
            <Col span={6} my={'xs'}>
              <CardClass classInfo={classInfo} />
            </Col>
          ))
        ) : (
          <Center mt={'lg'}>
            <Text fw={500} fz={'lg'}>
              Giáo viên này chưa có lớp nào.
            </Text>
          </Center>
        )}
      </Grid>
    </Stack>
  );
};
