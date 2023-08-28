import { useAppDispatch } from '@/hooks/redux';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { ICourse } from '@/types/models/ICourse';
import { IUser } from '@/types/models/IUser';
import { Center, Col, Grid, Group, Image, Stack, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardClass } from './components/CardClass';

export const TeacherDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [teacher, setTeacher] = useState<IUser>();
  const [courses, setCourses] = useState<ICourse[]>([]);

  const getTeacherDetails = useCallback(() => {
    if (!id) return;
    dispatch(
      TeacherActions.getTeacherById(id, {
        onSuccess: (data) => {
          setCourses(data.courses);
          setTeacher(data);
        }
      })
    );
  }, [dispatch, id]);

  useEffect(() => {
    getTeacherDetails();
  }, [dispatch, id, getTeacherDetails]);

  const renderLabelandValue = (label: string, value: string | undefined) => {
    return (
      <Stack spacing={'3px'}>
        <Text fw={600} mr={'md'}>
          {label}:
        </Text>
        <Text color="dimmed">{value}</Text>
      </Stack>
    );
  };

  return (
    <Stack>
      <Text fw={'bold'}>Thông tin giáo viên</Text>
      <Grid gutter={'xl'}>
        <Col span={4}>{renderLabelandValue('Họ tên', teacher?.fullName)}</Col>
        <Col span={4}>
          {renderLabelandValue('Số điện thoại', teacher?.phoneNumber)}
        </Col>
        <Col span={4}>{renderLabelandValue('Email', teacher?.email)}</Col>
        <Col span={4}>{renderLabelandValue('Mô tả', teacher?.description)}</Col>
      </Grid>
      <Group align="start">
        <Text fw={600} mr={'md'}>
          Ảnh:
        </Text>
        <Image src={teacher?.image} width={150} height={150} />
      </Group>
      <Text fw={'bold'} mt={'lg'}>
        Danh sách lớp học
      </Text>
      <Grid gutter={'lg'}>
        {courses?.length > 0 ? (
          courses.map((classInfo) => (
            <Col key={id} span={5} my={'xs'}>
              <CardClass classInfo={classInfo} />
            </Col>
          ))
        ) : (
          <Center mt={'lg'}>
            <Text fw={500} fz={'lg'} ml={'sm'}>
              Giáo viên này chưa có lớp nào.
            </Text>
          </Center>
        )}
      </Grid>
    </Stack>
  );
};
