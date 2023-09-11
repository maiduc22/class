import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { CourseActions } from '@/redux/reducers/course/course.action';
import { DateParser, TimeTable } from '@/types/models/ICourse';
import { IUser } from '@/types/models/IUser';
import {
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconCalendarCheck,
  IconClock,
  IconPlus,
  IconX
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalAddStudent } from './components/ModalAddStudent';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '@/configs/router';
import { RoomActions } from '@/redux/reducers/room/room.action';

const DateData: { label: string; value: string }[] = [
  { label: 'Thứ 2', value: 'MONDAY' },
  { label: 'Thứ 3', value: 'TUESDAY' },
  { label: 'Thứ 4', value: 'WEDNESDAY' },
  { label: 'Thứ 5', value: 'THURSDAY' },
  { label: 'Thứ 6', value: 'FRIDAY' },
  { label: 'Thứ 7', value: 'SATURDAY' },
  { label: 'CN', value: 'SUNDAY' }
];

export const CreateCourse = () => {
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

  const { rooms } = useAppSelector((state: RootState) => state.room);
  const { teachers } = useAppSelector((state: RootState) => state.teacher);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [selectedRoomTimetable, setSelectedRoomTimetable] = useState<
    TimeTable[]
  >([]);
  const [students, setStudents] = useState<IUser[]>([]);

  const [timetableList, setTimetableList] = useState<TimeTable[]>([]);

  const [opened, { close: close, open: open }] = useDisclosure();
  const [openedAddStudent, { close: closeAddStudent, open: openAddStudent }] =
    useDisclosure();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    dispatch(
      CourseActions.createCourse(
        {
          name,
          description,
          teacherId,
          roomId,
          studentIDs: students.map(({ id }) => id),
          members: students.length,
          timeTables: timetableList
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
  };

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

  return (
    <Stack>
      <Text>Tạo khoá học mới</Text>

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
        <Select
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
                    <Badge key={index}>
                      <Group align="center" spacing={2}>
                        <IconCalendar size={'1rem'} />
                        {DateParser(t.inDate)}: {t.hourStart}:
                        {t.minuteStart || '00'}-{t.hourEnd}:
                        {t.minuteEnd || '00'}
                      </Group>
                    </Badge>
                  ))
                : null}
            </Group>
            <Group>
              <Button
                leftIcon={<IconPlus size={'1rem'} />}
                variant="outline"
                onClick={() => open()}
                w={180}
                size="xs"
              >
                Thêm lịch học
              </Button>
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
        <Button onClick={() => handleCreateCourse()}>Tạo khoá học</Button>
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
      const newTimetableList = [...timetableList];
      setTimetableList([
        ...newTimetableList,
        { inDate: date, hourEnd, minuteEnd, hourStart, minuteStart }
      ]);
      close();
    }
  };

  const handleRemove = () => {};
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
