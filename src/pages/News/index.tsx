// import { ModalAddNew } from '@/components/modal/room/ModalAddNew';
// import { ModalUpdateNew } from '@/components/modal/room/ModalUpdateNew';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { NewsActions } from '@/redux/reducers/news/news.action';
import { INews } from '@/types/models/INews';
import { Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconEditCircle,
  IconInfoCircle,
  IconPlus,
  IconTrash
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalAddNews } from './components/ModalAddNews';
import { ModalEditNews } from './components/ModalEditNews';
import { ROUTER } from '@/configs/router';

export const News = () => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state: RootState) => state.news);
  const [_news, setNews] = useState<INews[]>(news);

  useEffect(() => setNews(news), [news]);

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure();

  const [selectedNew, setSelectedNew] = useState<INews>();

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Xác nhận tin tức',
      labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
      onConfirm: () => {
        dispatch(
          NewsActions.deleteNews(id, {
            onSuccess: () => {
              dispatch(NewsActions.getAllNews());
            }
          })
        );
      }
    });
  };

  const navigate = useNavigate();

  const column: DataTableColumn<INews>[] = [
    {
      accessor: 'title',
      title: 'Tiêu đề',
      textAlignment: 'center'
    },
    // {
    //   accessor: 'content',
    //   title: 'Nội dung',
    //   textAlignment: 'center'
    // },
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
                navigate(`${ROUTER.NEWS}/${record.id}`);
                openEditModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Sửa thông tin">
            <IconEditCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => {
                setSelectedNew(record);
                openEditModal();
              }}
            />
          </Tooltip>
          <Tooltip label="Xoá">
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
    data: _news,
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  return (
    <>
      {' '}
      <Stack spacing={'lg'}>
        <Group position="apart">
          <Text fw={500} fz={'lg'}>
            Quản lý Tin Tức
          </Text>
          <Button leftIcon={<IconPlus size={'1rem'} />} onClick={openAddModal}>
            Thêm
          </Button>
        </Group>
        <DataTable
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={column}
          records={records}
          totalRecords={_news?.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
      <Modal
        centered
        title={<Text fw={500}>Thêm mới </Text>}
        opened={openedAddModal}
        onClose={closeAddModal}
        size={'lg'}
      >
        <ModalAddNews close={closeAddModal} />
      </Modal>
      <Modal
        centered
        title={<Text fw={500}>Cập nhật</Text>}
        opened={openedEditModal}
        onClose={closeEditModal}
        size={'lg'}
      >
        <ModalEditNews close={closeEditModal} news={selectedNew} />
      </Modal>
    </>
  );
};
