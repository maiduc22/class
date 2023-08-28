import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RootState } from '@/redux/reducers';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { IFacility } from '@/types/models/IFacility';
import { IRoom, SelectedFacilities } from '@/types/models/IRoom';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export const RoomDetails: React.FC = () => {
  const { id } = useParams();
  const [room, setRoom] = useState<IRoom>();
  const dispatch = useAppDispatch();

  const column: DataTableColumn<IFacility>[] = [
    {
      accessor: 'name',
      title: 'Tên',
      textAlignment: 'center'
    },
    {
      accessor: 'description',
      title: 'Mô tả',
      textAlignment: 'center'
    },
    {
      accessor: 'image',
      title: 'Hình ảnh',
      textAlignment: 'center',
      render: (record) => (
        <Center>
          <Image
            src={record.image || ''}
            width={150}
            height={150}
            withPlaceholder
          />
        </Center>
      )
    },
    {
      accessor: 'qty',
      title: 'Số lượng',
      textAlignment: 'center'
    }
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage
  } = usePagination({
    data: room?.facilities || [],
    defaultPaging: {
      page: 1,
      pageSize: 5
    }
  });

  const [opened, { open, close }] = useDisclosure();
  const { facilities } = useAppSelector((state: RootState) => state.facility);
  const [_records, setRecords] = useState(facilities);

  const memo = useMemo(() => {
    return room?.facilities
      .filter((item) => item.qty && item.qty > 0)
      .map((item) => ({ id: item.id, qty: item.qty }));
  }, []);

  const [selectedFacilities, setSelectedFacilities] = useState<
    SelectedFacilities[]
  >(memo || []);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      facilities.filter(({ name }) => {
        if (
          debouncedQuery !== '' &&
          !name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, facilities]);

  const getRoomByID = useCallback(() => {
    if (id) {
      dispatch(
        RoomActions.getRoomById(id, {
          onSuccess: (data: IRoom) => {
            const newSelected = data.facilities
              .filter((item) => item.qty && item.qty > 0)
              .map((item) => {
                return { id: item.id, qty: item.qty };
              });
            setRoom(data);
            setSelectedFacilities(newSelected);
          }
        })
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    getRoomByID();
  }, [dispatch, getRoomByID, id]);

  const handleCancelUpdateFacilities = () => {
    const oldSelected = room?.facilities
      .filter((item) => item.qty && item.qty > 0)
      .map((item) => {
        return { id: item.id, qty: item.qty };
      });
    setSelectedFacilities(oldSelected || []);
    close();
  };

  const handleUpdateFacilities = () => {
    dispatch(
      RoomActions.updateRoom(
        id || '',
        {
          name: room?.name || '',
          capacity: room?.capacity || 0,
          description: room?.description || '',
          facilities: selectedFacilities || []
        },
        {
          onSuccess: () => {
            dispatch(RoomActions.getAllRooms());
            getRoomByID();
            close();
          }
        }
      )
    );
  };
  useEffect(() => {
    console.log('adasd');
    console.log(selectedFacilities);
  }, [selectedFacilities]);

  const getCurrentQty = (fac: IFacility) => {
    const index = selectedFacilities.findIndex((item) => item.id === fac.id);
    if (index == -1) return 0;
    return selectedFacilities[index].qty;
  };

  return (
    <Stack spacing={'md'}>
      <Text fw={500} fz={'lg'}>
        Thông tin chi tiết phòng học
      </Text>
      <Group>
        <Text fw={500}>Tên phòng học: </Text>
        <Text color="dimmed">{room?.name}</Text>
      </Group>
      <Group>
        <Text fw={500}>Mô tả: </Text>
        <Text color="dimmed">{room?.description}</Text>
      </Group>
      <Group>
        <Text fw={500}>Số chỗ ngồi: </Text>
        <Text color="dimmed">{room?.capacity}</Text>
      </Group>
      <Group position="apart">
        <Text fw={500}>Danh sách cơ sở vật chất</Text>
        <Button onClick={open}>Cập nhật danh sách</Button>
      </Group>
      <DataTable
        minHeight={200}
        withBorder
        withColumnBorders
        striped
        highlightOnHover
        columns={column}
        records={records}
        totalRecords={room?.facilities?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />

      <Modal
        centered
        title={<Text fw={500}>Cập nhật cơ sở vật chất</Text>}
        opened={opened}
        onClose={close}
        size={'lg'}
      >
        <Stack>
          <TextInput
            mt={'md'}
            radius="md"
            label="Chọn cơ sở vật chất"
            placeholder="Nhập tên"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <ScrollArea h={350}>
            {facilities.map((facility) => (
              <FacCard
                facility={facility}
                selectedFacilities={selectedFacilities}
                setSelectedFacilities={setSelectedFacilities}
                currentQty={getCurrentQty(facility)}
              />
            ))}
          </ScrollArea>
          <Group position="right">
            <Button
              variant="outline"
              onClick={() => {
                handleCancelUpdateFacilities();
                close();
              }}
            >
              Huỷ
            </Button>
            <Button onClick={handleUpdateFacilities}>Lưu</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

interface Props {
  facility: IFacility;
  selectedFacilities: SelectedFacilities[];
  setSelectedFacilities: React.Dispatch<
    React.SetStateAction<SelectedFacilities[]>
  >;
  currentQty: number;
}

const FacCard = ({
  facility,
  selectedFacilities,
  setSelectedFacilities,
  currentQty
}: Props) => {
  const [_quantity, setQuantity] = useState(currentQty);

  useEffect(() => {
    const index = selectedFacilities.findIndex(
      (item) => item.id === facility.id
    );

    if (_quantity > 0) {
      if (index !== -1) {
        const updatedSelectedFacilities = [...selectedFacilities];
        updatedSelectedFacilities[index].qty = _quantity;
        setSelectedFacilities(updatedSelectedFacilities);
      } else {
        setSelectedFacilities([
          ...selectedFacilities,
          { id: facility.id, qty: _quantity }
        ]);
      }
    } else if (index !== -1) {
      const updatedSelectedFacilities = [...selectedFacilities];
      updatedSelectedFacilities.splice(index, 1);
      setSelectedFacilities(updatedSelectedFacilities);
    }
  }, [_quantity, facility.id, selectedFacilities, setSelectedFacilities]);

  return (
    <Card shadow="md">
      <Grid align="center">
        <Grid.Col span={7}>
          <Group spacing="xl">
            <Image
              width={56}
              height={56}
              src={facility.image}
              withPlaceholder
            />
            <Text lineClamp={1}>{facility.name}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group grow>
            <ActionIcon
              disabled={_quantity <= 0}
              onClick={() => setQuantity((prev) => prev - 1)}
            >
              <IconMinus />
            </ActionIcon>
            <Text align="center">{_quantity}</Text>
            <ActionIcon onClick={() => setQuantity((prev) => prev + 1)}>
              <IconPlus />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
