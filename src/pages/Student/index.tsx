import { ModalAddUser } from '@/components/modal/ModalAddUser';
import { ModalUpdateUser } from '@/components/modal/ModalUpdateUser';
import { api } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { ROUTER } from '@/configs/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { StudentActions } from '@/redux/reducers/student/student.action';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserRole } from '@/types/models/IUser';
import { NotiType, renderNotification } from '@/utils/notifications';
import {
  Button,
  FileInput,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconDownload,
  IconEditCircle,
  IconInfoCircle,
  IconTrash
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Student: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state: RootState) => state.student);

  const [_records, setRecords] = useState<IUser[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<IUser>();
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

  useLayoutEffect(() => {
    dispatch(StudentActions.getAllStudent());
  }, [dispatch]);

  useEffect(() => setRecords(students), [students]);

  const [openedAddModal, { close: closeAddModal, open: openAddModal }] =
    useDisclosure();
  const [
    openedUpdateModal,
    { close: closeUpdateModal, open: openUpdateModal }
  ] = useDisclosure();

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Xác nhận xoá học viên',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          UserActions.deleteUser(id, {
            onSuccess: () => {
              dispatch(StudentActions.getAllStudent());
            }
          })
        );
      }
    });
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
    { accessor: 'dob', title: 'Ngày sinh', textAlignment: 'center' },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      width: '',
      render: (record) => (
        <Group position="center">
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
                handleDelete(record.id);
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

  const [importedFile, setImportedFile] = useState<File | null>(null);

  const handleSubmitImportedFile = () => {
    if (importedFile) {
      const formData = new FormData();
      formData.append('file', importedFile);
      const apiConfig = API_URLS.User.importUser(IUserRole.STUDENT);
      api
        .request({
          method: apiConfig.method,
          url: apiConfig.endPoint,
          headers: apiConfig.headers,
          data: formData
        })
        .then(() => {
          renderNotification(
            'Import danh sách học viên thành công',
            NotiType.SUCCESS
          );
          dispatch(StudentActions.getAllStudent());
        });
    }
  };

  const handleDownloadExcel = async () => {
    const url = API_URLS.User.exportUser(IUserRole.STUDENT);
    const fileName = 'Danh_sách_học_viên.xlsx';

    await api
      .get(url.endPoint, { ...url, responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
  };
  return (
    <Stack>
      <Text fw={600} size={'lg'}>
        Danh sách học sinh
      </Text>
      <Group position={'apart'}>
        <Input
          placeholder="Tìm kiếm theo họ tên"
          miw={300}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Group>
          <Button onClick={openAddModal} hidden>
            Thêm học sinh
          </Button>
        </Group>
      </Group>
      <Group position="apart">
        <Group>
          <FileInput
            placeholder="Import danh sách học viên"
            value={importedFile}
            onChange={(e) => setImportedFile(e)}
          />
          <Button onClick={handleSubmitImportedFile}>Tải lên</Button>
        </Group>
        <Button
          variant="outline"
          leftIcon={<IconDownload />}
          onClick={handleDownloadExcel}
        >
          Excel
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
        title="Thêm học sinh"
      >
        <ModalAddUser closeModal={closeAddModal} role={IUserRole.STUDENT} />
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

export default Student;
