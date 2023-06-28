import CustomLoader from '@/components/custom/CustomLoader';
import { UpdateRolePayload } from '@/configs/api/payload';
import { ROUTER } from '@/configs/router';
import { useAppDispatch } from '@/hooks/redux';
import usePagination from '@/hooks/use-pagination';
import { RoleActions } from '@/redux/reducers/role/role.action';
import { IRole, IRoleStatus, IRoleStatusDict } from '@/types/models/IRole';
import { IUser, IUserGenderDict, IUserStatusDict } from '@/types/models/IUser';
import { NotiType, renderNotification } from '@/utils/notifications';
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEditCircle,
  IconInfoCircle,
  IconLayoutGridRemove,
  IconUserPlus
} from '@tabler/icons-react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalAddUserIntoRole } from './components/ModalAddUserIntoRole';

export const RoleDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [_roleDetails, setRoleDetails] = useState<IRole>();
  const [_isEditing, setIsEditing] = useState(false);
  const [opened, { close, open }] = useDisclosure();

  const getRoleDetails = useCallback(() => {
    dispatch(
      RoleActions.getDetailsRole(id, {
        onSuccess: (data: IRole) => setRoleDetails(data)
      })
    );
  }, [dispatch, id]);

  const form = useForm<UpdateRolePayload>({
    validate: {
      name: isNotEmpty('Bạn cần nhập tên'),
      description: isNotEmpty('Bạn cần nhập mô tả')
    }
  });

  useEffect(() => {
    getRoleDetails();
  }, [dispatch, id, getRoleDetails]);

  useEffect(() => {
    form.setValues({
      ...form.values,
      name: _roleDetails?.name,
      description: _roleDetails?.description,
      isRoot: _roleDetails?.isRoot,
      properties: _roleDetails?.properties
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_roleDetails]);

  const handleCancelUpdate = () => {
    // form.reset();
    setIsEditing(false);
  };

  const isDirty = () => {
    const fieldsToCheck: (keyof UpdateRolePayload)[] = [
      'description',
      'name',
      'isRoot',
      'properties'
    ];

    for (const field of fieldsToCheck) {
      if (form.values[field] !== _roleDetails?.[field]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmitUpdate = (values: UpdateRolePayload) => {
    if (!_isEditing) {
      setIsEditing(true);
    } else {
      if (isDirty()) {
        dispatch(
          RoleActions.updateRole(values, _roleDetails?.id, {
            onSuccess: () => {
              dispatch(
                RoleActions.getDetailsRole(id, {
                  onSuccess: (data: IRole) => {
                    setRoleDetails(data);
                    dispatch(RoleActions.getAllRole());
                  }
                })
              );
            }
          })
        );
      } else {
        renderNotification('Bạn chưa thay đổi thông tin gì', NotiType.ERROR);
      }
      setIsEditing(false);
    }
  };

  const handleRemoveUser = (userId: string) => {
    dispatch(
      RoleActions.removeUser(userId, _roleDetails?.id, {
        onSuccess: () => {
          getRoleDetails();
          dispatch(RoleActions.getAllRole());
        }
      })
    );
  };

  const columns: DataTableColumn<IUser>[] = [
    { accessor: 'employeeCode', title: 'Mã nhân sự' },
    { accessor: 'fullName', title: 'Họ tên' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phoneNumber', title: 'Số điện thoại' },
    { accessor: 'dayOfBirth', title: 'Ngày sinh' },
    {
      accessor: 'gender',
      title: 'Giới tính',
      render: ({ gender }) => {
        return IUserGenderDict[gender].label;
      }
    },
    {
      accessor: 'status',
      title: 'Trạng thái',
      render: ({ status }) => {
        return (
          <Badge color={IUserStatusDict[status].color}>
            {IUserStatusDict[status].label}
          </Badge>
        );
      }
    },
    {
      accessor: '',
      title: '',
      textAlignment: 'center',
      render: ({ id }) => (
        <Group position="center">
          <Tooltip label="Thông tin chi tiết">
            <IconInfoCircle
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => navigate(`${ROUTER.USER}/${id}`)}
            />
          </Tooltip>
          <Tooltip label="Xoá khỏi vai trò">
            <IconLayoutGridRemove
              cursor={'pointer'}
              size={'1rem'}
              onClick={() => handleRemoveUser(id)}
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
    data: _roleDetails?.users || [],
    defaultPaging: {
      page: 1,
      pageSize: 10
    }
  });

  return (
    <Stack>
      <Group position="apart" mb={'lg'}>
        <Text fw={600} size={'lg'}>
          Thông tin chi tiết vai trò
        </Text>
        <Group>
          {_isEditing ? (
            <Button onClick={handleCancelUpdate} variant="outline">
              Huỷ
            </Button>
          ) : null}
          <Button
            leftIcon={<IconEditCircle size={'1rem'} />}
            type={'submit'}
            form={`update-role-form-${_roleDetails?.id}`}
          >
            {_isEditing ? 'Lưu thông tin' : 'Sửa thông tin'}
          </Button>
        </Group>
      </Group>
      {!_roleDetails ? (
        <CustomLoader />
      ) : (
        <form
          id={`update-role-form-${_roleDetails?.id}`}
          onSubmit={form.onSubmit((values) => handleSubmitUpdate(values))}
        >
          <Grid gutter={'md'}>
            <Col span={2}>
              {renderLabelandValue(
                'Mã vai trò',
                <Text>{_roleDetails?.code}</Text>
              )}
            </Col>
            <Col span={3}>
              {_isEditing ? (
                <TextInput
                  label="Tên"
                  placeholder="Nhập tên"
                  {...form.getInputProps('name')}
                />
              ) : (
                renderLabelandValue(
                  'Tên vai trò',
                  <Text>{_roleDetails?.name}</Text>
                )
              )}
            </Col>

            <Col span={3}>
              {renderLabelandValue(
                'Trạng thái hoạt động',
                <Badge
                  w={'fit-content'}
                  color={
                    IRoleStatusDict[_roleDetails?.status || IRoleStatus.ACTIVE]
                      .color
                  }
                >
                  {
                    IRoleStatusDict[_roleDetails?.status || IRoleStatus.ACTIVE]
                      .label
                  }
                </Badge>
              )}
            </Col>
            <Col span={3}>
              {_isEditing ? (
                <Checkbox
                  label="Cấp toàn quyền quản trị"
                  checked={form.values.isRoot}
                  {...form.getInputProps('isRoot')}
                />
              ) : (
                renderLabelandValue(
                  'Cấp toàn quyền quản trị',
                  <Text>{_roleDetails.isRoot ? 'Có' : 'Không'}</Text>
                )
              )}
            </Col>
            <Col span={12}>
              {_isEditing ? (
                <TextInput
                  label="Mô tả"
                  placeholder="Nhập mô tả"
                  {...form.getInputProps('description')}
                />
              ) : (
                renderLabelandValue(
                  'Mô tả',
                  <Text>{_roleDetails?.description}</Text>
                )
              )}
            </Col>
          </Grid>
        </form>
      )}
      <Group position="apart" mt={'xl'}>
        <Text fw={600} size={'lg'}>
          Danh sách nhân sự đảm nhận vai trò
        </Text>
        <Button onClick={open} leftIcon={<IconUserPlus size={'1rem'} />}>
          Thêm nhân sự
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
        totalRecords={_roleDetails?.users?.length}
        page={page}
        onPageChange={changePage}
        recordsPerPage={pageSize}
        paginationText={() => null}
      />
      <Modal
        title="Thêm nhân sự vào vai trò"
        centered
        size={1000}
        opened={opened}
        onClose={close}
      >
        <ModalAddUserIntoRole
          close={close}
          getRoleDetails={getRoleDetails}
          roleId={id}
        />
      </Modal>
    </Stack>
  );
};

const renderLabelandValue = (label: string, element: ReactElement) => {
  return (
    <Stack spacing={'3px'}>
      <Text fw={600} mr={'md'}>
        {label}:
      </Text>
      {element}
    </Stack>
  );
};
