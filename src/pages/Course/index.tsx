import { ROUTER } from '@/configs/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { CourseActions } from '@/redux/reducers/course/course.action';
import { DateParser, ICourse } from '@/types/models/ICourse';
import { IUser } from '@/types/models/IUser';
import {
  Badge,
  Button,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconEdit,
  IconTrash,
  IconUser
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Course = () => {
  const { courses } = useAppSelector((state: RootState) => state.course);
  console.log(courses);
  const [_records, setRecords] = useState<ICourse[]>(courses);
  const [selectedRecord, setSelectedRecord] = useState<ICourse>();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(CourseActions.getAllCourses());
  }, [dispatch]);

  useEffect(() => setRecords(courses), [courses]);

  const [opened, { close: close, open: open }] = useDisclosure();

  const navigate = useNavigate();
  const column: DataTableColumn<ICourse>[] = [
    {
      accessor: 'name',
      title: 'Tên khoá học'
    },
    {
      accessor: 'description',
      title: 'Mô tả'
    },
    {
      accessor: 'giaovien',
      title: 'Giáo viên',
      render: ({ teacher }) => {
        return teacher.fullName;
      }
    },
    {
      accessor: 'phonghoc',
      title: 'Phòng học',
      render: ({ room }) => {
        return room?.name;
      }
    },
    {
      accessor: 'lichhoc',
      title: 'Lịch học',
      width: '400px',
      render: ({ timeTableList }) => {
        return timeTableList?.map((t) => (
          <Badge>
            <Group align="center">
              <IconCalendar size={'1rem'} />
              {DateParser(t.inDate)}: {t.start?.slice(0, 5)}-
              {t.end?.slice(0, 5)}
            </Group>
          </Badge>
        ));
      }
    },
    {
      accessor: '',
      title: '',
      width: '150px',
      textAlignment: 'center',
      render: (record) => (
        <Group position="center">
          <Tooltip label="Xem danh sách học viên">
            <IconUser
              size={'1rem'}
              color="blue"
              onClick={() => {
                setSelectedRecord(record);
                open();
              }}
              cursor={'pointer'}
            />
          </Tooltip>
          <Tooltip label="Cập nhật ">
            <IconEdit
              size={'1rem'}
              color="blue"
              onClick={() => navigate(`${ROUTER.COURSE}/${record.id}`)}
              cursor={'pointer'}
            />
          </Tooltip>
          <Tooltip label="Xoá khóc học">
            <IconTrash
              size={'1rem'}
              color="blue"
              onClick={() =>
                dispatch(
                  CourseActions.deleteCourse(record.id, {
                    onSuccess: () => dispatch(CourseActions.getAllCourses())
                  })
                )
              }
              cursor={'pointer'}
            />
          </Tooltip>
        </Group>
      )
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  return (
    <Stack spacing={'lg'}>
      <Group position="apart">
        <Text fw={500} fz={'lg'}>
          Quản lý khoá học
        </Text>
        <Button onClick={() => navigate(ROUTER.CREATE_COURSE)}>
          Thêm khoá học
        </Button>
      </Group>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={column}
        records={_records}
        totalRecords={records?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
      <Modal
        opened={opened}
        title="Danh sách học viên"
        onClose={close}
        centered
        size={'lg'}
      >
        <ListStudentModal students={selectedRecord?.students || []} />
      </Modal>
    </Stack>
  );
};

interface ModalProps {
  students: IUser[];
}
const ListStudentModal = ({ students }: ModalProps) => {
  const [_records, setRecords] = useState<IUser[]>(students);

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
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(() => {
    setRecords(
      students.filter((student) => {
        if (debounceQuery !== '') {
          if (
            student.fullName
              .toLocaleLowerCase()
              .includes(debounceQuery.toLocaleLowerCase())
          ) {
            return true;
          }
        } else {
          return true;
        }
      })
    );
  }, [students, debounceQuery]);
  return (
    <Stack>
      <Input
        placeholder="Tìm kiếm theo họ tên"
        miw={300}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={columns}
        records={records}
        totalRecords={_records?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};
