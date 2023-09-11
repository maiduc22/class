import { useAppDispatch } from '@/hooks/redux';
import { CourseActions } from '@/redux/reducers/course/course.action';
import { ICourse } from '@/types/models/ICourse';
import { Stack, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UpdateCourse = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<ICourse>();
  console.log(course);
  const getCourseDetails = useCallback(() => {
    if (!id) return;
    dispatch(
      CourseActions.getCourseById(id, {
        onSuccess: (data) => {
          setCourse(data);
        }
      })
    );
  }, [dispatch, id]);

  useEffect(() => {
    getCourseDetails();
  }, [dispatch, id, getCourseDetails]);

  return (
    <Stack>
      <Text fw={500} fz={'lg'}>
        Cập nhật thông tin khoá học
      </Text>
    </Stack>
  );
};
