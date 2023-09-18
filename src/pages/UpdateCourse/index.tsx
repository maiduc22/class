import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { CourseActions } from '@/redux/reducers/course/course.action';
import { DateParser, ICourse, TimeTable } from '@/types/models/ICourse';
import { IUser, IUserRole } from '@/types/models/IUser';
import jwt_decode from 'jwt-decode';
import {
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconPlus } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateData } from '../CreateCourse';
import usePagination from '@/hooks/use-pagination';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { ROUTER } from '@/configs/router';
import { ModalAddStudent } from '../CreateCourse/components/ModalAddStudent';

export const UpdateCourse = () => {
  const decodedToken: { role: string; id: string } = jwt_decode(
    localStorage.getItem('token') || ''
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { rooms } = useAppSelector((state: RootState) => state.room);
  const { teachers } = useAppSelector((state: RootState) => state.teacher);

  const [course, setCourse] = useState<ICourse>();

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

  const getInitialSelectedRoomTimetale = useCallback(() => {
    const room = rooms.find((r) => r.id === course?.room?.id);
    if (room) {
      return room.timeTables;
    }
    return [];
  }, [course?.roomId, rooms]);

  useEffect(() => {
    console.log(course);
    setName(course?.name);
    setDescription(course?.description);
    setTeacherId(course?.teacher.id);
    setRoomId(course?.room?.id);
    setSelectedRoomTimetable(getInitialSelectedRoomTimetale());
    setTimetableList(course?.timeTableList || []);
    setStudents(course?.students || []);
    setSelectedRoomTimetable(
      rooms.find((r) => r.id === course?.room?.id)?.timeTables
    );
  }, [course, getInitialSelectedRoomTimetale]);

  const [name, setName] = useState(course?.name);
  const [description, setDescription] = useState(course?.description);
  const [teacherId, setTeacherId] = useState(course?.teacherId);
  const [roomId, setRoomId] = useState(course?.roomId);
  const [selectedRoomTimetable, setSelectedRoomTimetable] = useState<
    TimeTable[]
  >([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [timetableList, setTimetableList] = useState<TimeTable[]>([]);

  const [opened, { close: close, open: open }] = useDisclosure();
  const [openedAddStudent, { close: closeAddStudent, open: openAddStudent }] =
    useDisclosure();

  const handleUpdateCourse = () => {
    const arr = timetableList.map((t) => ({
      ...t,
      hourStart: parseInt(t.start?.slice(0, 2) || ''),
      minuteStart: parseInt(t.start?.slice(3, 5) || ''),
      hourEnd: parseInt(t.end?.slice(0, 2) || ''),
      minuteEnd: parseInt(t.end?.slice(3, 5) || '')
    }));
    console.log(arr);
    console.log(timetableList);
    if (name && description && course?.id) {
      dispatch(
        CourseActions.updateCourse(
          course?.id,
          {
            name,
            description,
            teacherId,
            roomId,
            studentIDs: students.map(({ id }) => id),
            members: students.length,
            timeTables: arr
          },
          {
            onSuccess: () => {
              dispatch(CourseActions.getAllCourses());
              dispatch(RoomActions.getAllRooms());
              navigate(ROUTER.COURSE);
            }
          }
        )
      );
    }
  };

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'userName', title: 'Tên tài khoản', textAlignment: 'center' },
    { accessor: 'fullName', title: 'Họ tên', textAlignment: 'center' },
    {
      accessor: 'phoneNumber',
      title: 'Số điện thoại',
      textAlignment: 'center'
    },
    {
      accessor: 'email',
      title: 'Email',
      textAlignment: 'center'
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: students,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  const handleRemoveBadge = (badge: TimeTable) => {
    // const index = timetableList.findIndex(t => t.inDate === badge.inDate && t.)
    console.log(badge);
  };
  return (
    <Stack>
      <Text fw={500} fz={'lg'}>
        Cập nhật thông tin khoá học
      </Text>

      <TextInput
        label="Tên khoá học"
        w={500}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="Mô tả"
        w={500}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Group spacing={'md'}>
        {decodedToken.role === IUserRole.ADMIN ? (
          <Select
            data={rooms.map((room) => ({
              value: room.id,
              label: room.name
            }))}
            label="Phòng học"
            w={183}
            value={roomId}
            onChange={(value) => {
              setRoomId(value || '');
              setSelectedRoomTimetable(
                rooms.find((r) => r.id === value)?.timeTables
              );
            }}
          />
        ) : (
          <Select
            disabled
            data={[
              {
                value: course?.room?.id,
                label: course?.room?.name
              }
            ]}
            label="Phòng học"
            w={183}
            value={course?.room?.id}
          />
        )}
        <Select
          disabled={decodedToken.role === IUserRole.TEACHER}
          data={teachers.map((teacher) => ({
            value: teacher.id,
            label: teacher.fullName
          }))}
          label="Giáo viên"
          w={300}
          value={teacherId}
          onChange={(value) => setTeacherId(value || '')}
        />
      </Group>
      <Group>
        {selectedRoomTimetable ? (
          <Group>
            <Text fw={500} fz={14}>
              Các khung giờ đã có lớp
            </Text>
            {selectedRoomTimetable.map((t, index) => (
              <Badge key={index}>
                <Group align="center" spacing={2}>
                  <IconCalendar size={'1rem'} />
                  {DateParser(t.inDate)}: {t.start?.slice(0, 5)}-
                  {t.end?.slice(0, 5)}
                </Group>
              </Badge>
            ))}
          </Group>
        ) : null}
      </Group>
      {roomId && (
        <Group mt={'md'} align="start">
          <Text fw={500} fz={14}>
            Lịch học
          </Text>
          <Stack>
            <Group>
              {timetableList.length > 0
                ? timetableList.map((t, index) => (
                    <Badge key={index} onClick={() => handleRemoveBadge(t)}>
                      {t.start ? (
                        <Group align="center" spacing={2}>
                          <IconCalendar size={'1rem'} />
                          {DateParser(t.inDate)}: {t.start?.slice(0, 5)}-
                          {t.end?.slice(0, 5)}
                        </Group>
                      ) : (
                        <Group align="center" spacing={2}>
                          <IconCalendar size={'1rem'} />
                          {DateParser(t.inDate)}: {t.hourStart}:
                          {t.minuteStart || '00'}-{t.hourEnd}:
                          {t.minuteEnd || '00'}
                        </Group>
                      )}
                    </Badge>
                  ))
                : null}
            </Group>
            <Group>
              {decodedToken.role === IUserRole.ADMIN && (
                <Button
                  leftIcon={<IconPlus size={'1rem'} />}
                  variant="outline"
                  onClick={() => open()}
                  w={180}
                  size="xs"
                >
                  Thêm lịch học
                </Button>
              )}
            </Group>
          </Stack>
        </Group>
      )}

      <Stack>
        <Group position="apart">
          <Text fw={500} fz={14}>
            Danh sách học sinh
          </Text>
          <Button variant="outline" size="xs" onClick={openAddStudent}>
            Cập nhật danh sách
          </Button>
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={students?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>

      <Group position="right" mt={'lg'}>
        <Button onClick={() => handleUpdateCourse()}>Cập nhật khoá học</Button>
      </Group>

      <Modal
        title="Thêm lịch"
        centered
        size="sm"
        opened={opened}
        onClose={close}
      >
        <ModalAddTimetable
          close={close}
          timetableList={timetableList}
          setTimetableList={setTimetableList}
        />
      </Modal>

      <Modal
        title="Cập nhật danh sách học sinh"
        centered
        size="xl"
        opened={openedAddStudent}
        onClose={closeAddStudent}
      >
        <ModalAddStudent
          currentStudents={students}
          setCurrentStudents={setStudents}
        />
      </Modal>
    </Stack>
  );
};

interface ModalProps {
  close: () => void;
  timetableList: TimeTable[];
  setTimetableList: Dispatch<SetStateAction<TimeTable[]>>;
}

export const ModalAddTimetable = ({
  close,
  setTimetableList,
  timetableList
}: ModalProps) => {
  const [date, setDate] = useState<string>();
  const [start, setTimeStart] = useState<string>();
  const [end, setTimeEnd] = useState<string>();
  const handleAdd = () => {
    if (end && start) {
      const [hourStart, minuteStart] = start.split(':').map(Number);
      const [hourEnd, minuteEnd] = end.split(':').map(Number);
      console.log({
        inDate: date,
        hourEnd,
        minuteEnd,
        hourStart,
        minuteStart,
        end,
        start
      });
      const newTimetableList = [...timetableList];
      setTimetableList([
        ...newTimetableList,
        { inDate: date, hourEnd, minuteEnd, hourStart, minuteStart, end, start }
      ]);
      close();
    }
  };

  // const handleRemove = () => {};
  return (
    <>
      <Stack h={300}>
        <Select
          data={DateData}
          label="Ngày"
          placeholder="Chọn ngày"
          value={date}
          onChange={(value) => setDate(value || '')}
        />
        <Group position="apart">
          <TimeInput
            withSeconds={false}
            style={{ width: '45%' }}
            label="Bắt đầu"
            onChange={(e) => setTimeStart(e.currentTarget.value)}
            value={start}
          />
          <TimeInput
            withSeconds={false}
            style={{ width: '45%' }}
            label="Kết thúc"
            onChange={(e) => setTimeEnd(e.currentTarget.value)}
            value={end}
          />
        </Group>
      </Stack>
      <Group position="right">
        <Button onClick={() => handleAdd()}>Thêm</Button>
      </Group>
    </>
  );
};
