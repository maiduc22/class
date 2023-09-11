import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { StudentActions } from '@/redux/reducers/student/student.action';
import { IUser } from '@/types/models/IUser';
import { Button, Group, Input, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';

interface Props {
  currentStudents: IUser[];
  setCurrentStudents: Dispatch<SetStateAction<IUser[]>>;
}

export const ModalAddStudent = ({
  currentStudents,
  setCurrentStudents
}: Props) => {
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state: RootState) => state.student);
  const [_records, setRecords] = useState<IUser[]>([]);

  useLayoutEffect(() => {
    dispatch(StudentActions.getAllStudent());
  }, [dispatch]);

  useEffect(() => setRecords(students), [students]);

  const isAdded = (student: IUser) => {
    const index = currentStudents.findIndex((item) => item.id === student.id);
    return index === -1 ? false : true;
  };

  const handleAdd = (student: IUser) => {
    const newArr = [...currentStudents];
    setCurrentStudents([...newArr, student]);
  };

  const handleRemove = (student: IUser) => {
    const index = currentStudents.findIndex((item) => item.id === student.id);
    const newArr = [...currentStudents];
    newArr.splice(index, 1);
    setCurrentStudents(newArr);
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
    },
    {
      accessor: '',
      title: '',
      render: (record) => {
        return isAdded(record) ? (
          <Button onClick={() => handleRemove(record)}>Xoá khỏi lớp</Button>
        ) : (
          <Button onClick={() => handleAdd(record)}>Thêm vào lớp</Button>
        );
      }
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
