import { ModalAddUser } from '@/components/modal/ModalAddUser';
import { ModalUpdateUser } from '@/components/modal/ModalUpdateUser';
import { ROUTER } from '@/configs/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { TeacherActions } from '@/redux/reducers/teacher/teacher.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserRole } from '@/types/models/IUser';
import {
  Button,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconEditCircle, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherDetails } from '../TeacherDetails';

const Teacher: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((state: RootState) => state.teacher);
  const [_records, setRecords] = useState<IUser[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<IUser>();
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(() => {
    setRecords(
      teachers.filter((teacher) => {
        if (debounceQuery !== '') {
          if (
            teacher.fullName
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
  }, [teachers, debounceQuery]);

  useLayoutEffect(() => {
    dispatch(TeacherActions.getAllTeacher());
  }, [dispatch]);

  useEffect(() => setRecords(teachers), [teachers]);

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] =
    useDisclosure();
  const [
    openedUpdateModal,
    { close: closeUpdateModal, open: openUpdateModal }
  ] = useDisclosure();
  const [
    openedDetailsModal,
    { close: closeDetailsModal, open: openDetailsModal }
  ] = useDisclosure();

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'userName', title: 'Tên tài khoản', textAlignment: 'center' },
    { accessor: 'fullName', title: 'Họ tên', textAlignment: 'center' },
    {
      accessor: 'phoneNumber',
      title: 'Số điện thoại',
      textAlignment: 'center'
    },
    { accessor: 'dayOfBirth', title: 'Ngày sinh', textAlignment: 'center' },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '',
      render: (record) => (
        <Group position="center">
          <Tooltip label="Thông tin chi tiết">
            <IconInfoCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                navigate(`${ROUTER.TEACHER}/${record.id}`);
                // setSelectedRecord(record);
                // openDetailsModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Sửa thông tin">
            <IconEditCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedRecord(record);
                openUpdateModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Xoá tài khoản">
            <IconTrash
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                dispatch(
                  UserActions.deleteUser(record.id, {
                    onSuccess: () => {
                      dispatch(TeacherActions.getAllTeacher());
                    }
                  })
                );
              }}
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
    <Stack>
      <Text fw={600} size={'lg'}>
        Danh sách giáo viên
      </Text>
      <Group position={'apart'}>
        <Input
          placeholder="Tìm kiếm theo họ tên"
          miw={300}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Group>
          <Button onClick={openAddModal} hidden>
            Thêm giáo viên
          </Button>
        </Group>
      </Group>
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

      <Modal
        centered
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Thêm giáo viên"
      >
        <ModalAddUser closeModal={closeAddModal} role={IUserRole.TEACHER} />
      </Modal>

      <Modal
        centered
        size={'xl'}
        opened={openedDetailsModal}
        onClose={closeDetailsModal}
        title={<Text fw={'bold'}>Chi tiết thông tin giáo viên</Text>}
      >
        <TeacherDetails />
      </Modal>
      <Modal
        centered
        opened={openedUpdateModal}
        onClose={closeUpdateModal}
        title="Cập nhật thông tin"
      >
        <ModalUpdateUser
          closeModal={closeUpdateModal}
          user={selectedRecord || null}
        />
      </Modal>
    </Stack>
  );
};

export default Teacher;
