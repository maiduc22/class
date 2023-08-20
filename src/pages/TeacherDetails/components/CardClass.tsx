import ClassImage from '@/assets/imgs/class.avif';
import usePagination from '@/hooks/use-pagination';
import { DateParser, ICourse } from '@/types/models/ICourse';
import { IUser } from '@/types/models/IUser';
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Input,
  Modal,
  Stack,
  Text
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
interface Props {
  classInfo: ICourse;
}

export const CardClass: React.FC<Props> = ({ classInfo }) => {
  const { name, students, description, room, timeTableList } = classInfo;
  const [openedListModal, { open: openListModal, close: closeListModal }] =
    useDisclosure();

  return (
    <Card withBorder radius={'md'} shadow="xs" p={'0'}>
      <Card.Section>
        <Image height={'100px'} src={ClassImage} />
      </Card.Section>
      <Stack p={'sm'} spacing={'xs'}>
        <Text fw={'bold'}>{name}</Text>
        <Text color="dimmed">{description}</Text>
        <Group position="apart">
          <Badge color="blue">Phòng {room?.name}</Badge>
          <Badge color="gray">Số lượng tối đa: {room?.capacity}</Badge>
        </Group>
        <Group spacing={'xs'}>
          <Text color="dimmed">Thời gian:</Text>
          {timeTableList.map((time) => (
            <Text color="dimmed">
              {DateParser(time.inDate)}({time.start} -{time.end})
            </Text>
          ))}
        </Group>
        <Button onClick={openListModal}>Xem danh sách học sinh</Button>
      </Stack>

      <Modal
        centered
        size={'xl'}
        title={<Text fw={'bold'}>Danh sách học sinh</Text>}
        opened={openedListModal}
        onClose={closeListModal}
      >
        <ModalListStudent close={closeListModal} students={students} />
      </Modal>
    </Card>
  );
};

interface ModalListStudentProps {
  close: () => void;
  students: IUser[] | undefined;
}

const ModalListStudent = ({ students }: ModalListStudentProps) => {
  const [_records, setRecords] = useState<IUser[]>(students || []);
  const [_query, setQuery] = useState('');
  const [debounceQuery] = useDebouncedValue(_query, 200);

  useEffect(() => {
    if (students && students?.length > 0) {
      setRecords(
        students.filter((student: IUser) => {
          if (debounceQuery !== '') {
            if (
              student.fullName
                .toLowerCase()
                .includes(debounceQuery.toLowerCase())
            ) {
              return true;
            }
          } else {
            return true;
          }
        })
      );
    }
  }, [students, debounceQuery]);

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'fullName', title: 'Họ tên' },
    { accessor: 'phoneNumber', title: 'Số điện thoại' },
    { accessor: 'dob', title: 'Ngày sinh' },
    { accessor: 'email', title: 'Email' }
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
      <Group>
        <Input
          placeholder="Tìm kiếm theo họ tên"
          miw={300}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </Group>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={columns}
        records={records}
        totalRecords={_records.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
    </Stack>
  );
};
