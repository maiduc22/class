import CustomLoader from '@/components/custom/CustomLoader';
import { ChangeProfilePayload } from '@/configs/api/payload';
import { useAuthContext } from '@/hooks/context';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/reducers';
import { UserActions } from '@/redux/reducers/user/user.action';
import { IUser, IUserGender, IUserGenderDict } from '@/types/models/IUser';
import { NotiType, renderNotification } from '@/utils/notifications';
import { RESOURCES, SCOPES, isGrantedPermission } from '@/utils/permissions';
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Col,
  Grid,
  Group,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserDetails = () => {
  const { state } = useAuthContext();
  const { authorities } = state;
  const [_authorities, setAuthorities] = useState(authorities);

  useEffect(() => {
    setAuthorities(authorities);
  }, [authorities]);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [_user, setUser] = useState<IUser>();

  const form = useForm<ChangeProfilePayload>({
    validate: {
      fullName: isNotEmpty('Họ tên không được bỏ trống'),
      email: isEmail('Email không đúng định dạng'),
      phoneNumber: isNotEmpty('Số điện thoại không được bỏ trống'),
      dayOfBirth: isNotEmpty('Ngày sinh không được bỏ trống'),
      roleIds: isNotEmpty('Chưa lựa chọn vai trò')
    }
  });

  useEffect(() => {
    dispatch(
      UserActions.getUserById(id, {
        onSuccess: (data: IUser) => {
          setUser({
            ...data,
            roleIds: data.roles.map(({ id }) => id)
          });
          form.setValues({
            ...form.values,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dayOfBirth: data.dayOfBirth,
            avatarFileId: data.avatarFileId,
            description: data.description,
            gender: data.gender,
            roleIds: data.roles.map(({ id }) => id),
            departmentId: data.departmentId
          });
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const [_isEditing, setIsEditing] = useState(false);
  const { roles } = useAppSelector((state: RootState) => state.role);
  const { departments } = useAppSelector(
    (state: RootState) => state.department
  );

  const handleCancel = () => {
    setIsEditing(false);
  };

  const isDirty = () => {
    const fieldsToCheck: (keyof ChangeProfilePayload)[] = [
      'description',
      'fullName',
      'email',
      'phoneNumber',
      'dayOfBirth',
      'departmentId',
      'gender',
      'roleIds',
      'avatarFileId'
    ];

    for (const field of fieldsToCheck) {
      if (field == 'roleIds') {
        if (!_.isEqual(form.values[field], _user?.[field])) {
          console.log(
            '🚀 ~ file: index.tsx:97 ~ isDirty ~ field:',
            field,
            _user?.[field],
            form.values[field]
          );
          return true;
        }
      }
      if (field !== 'roleIds') {
        if (form.values[field] !== _user?.[field]) {
          console.log(
            '🚀 ~ file: index.tsx:97 ~ isDirty ~ field:',
            field,
            _user?.[field],
            form.values[field]
          );
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = (values: ChangeProfilePayload) => {
    if (!_isEditing) {
      setIsEditing(true);
    } else {
      if (isDirty()) {
        dispatch(
          UserActions.updateUser(values, _user?.id, {
            onSuccess: () => dispatch(UserActions.getAllUser())
          })
        );
      } else {
        renderNotification('Bạn chưa thay đổi thông tin', NotiType.ERROR);
      }
      setIsEditing(false);
    }
  };

  return (
    <>
      <Group position="apart" mb={'xl'}>
        <Text fw={600} size={'lg'}>
          Thông tin nhân sự
        </Text>
        {isGrantedPermission(_authorities, RESOURCES.USER, SCOPES.UPDATE) ? (
          <Group position="center">
            {_isEditing ? (
              <Button onClick={handleCancel} variant="outline">
                Huỷ
              </Button>
            ) : null}
            <Button
              leftIcon={<IconEdit size={'1rem'} />}
              type={'submit'}
              form={`form-update-profile-${_user?.id}`}
            >
              {_isEditing ? 'Lưu thông tin' : 'Sửa thông tin'}
            </Button>
          </Group>
        ) : null}
      </Group>
      {!_user ? (
        <CustomLoader />
      ) : (
        <form
          id={`form-update-profile-${_user?.id}`}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
            <Col span={3}>
              <Stack w={'100%'}>
                <Text align="left" color="dimmed">
                  Ảnh đại diện
                </Text>
                <Center>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      size={250}
                      w={'100%'}
                      color="cyan"
                      radius="xl"
                      src={_user?.avatarFileId}
                    />
                    <IconEdit
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                      }}
                      cursor={'pointer'}
                    />
                  </Box>
                </Center>
              </Stack>
            </Col>
            <Col span={4}>
              <Stack spacing={'md'}>
                <Text align="left" color="dimmed">
                  Thông tin cá nhân
                </Text>
                <TextInput
                  label="Họ tên"
                  placeholder="Nhập họ tên"
                  disabled={!_isEditing}
                  size={'sm'}
                  {...form.getInputProps('fullName')}
                />

                <TextInput
                  label="Email"
                  placeholder="Nhập email"
                  disabled={!_isEditing}
                  size={'sm'}
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  disabled={!_isEditing}
                  {...form.getInputProps('phoneNumber')}
                />
                <DatePickerInput
                  label="Ngày sinh"
                  placeholder="Nhập ngày sinh"
                  disabled={!_isEditing}
                  value={dayjs(form.values.dayOfBirth).toDate()}
                  onChange={(value) => {
                    form.setValues({
                      ...form.values,
                      dayOfBirth: dayjs(value).format('YYYY-MM-DD').toString()
                    });
                  }}
                />
                <Group position="left">
                  <Text fw={600} fz="sm">
                    Giới tính
                  </Text>
                  <Checkbox
                    disabled={!_isEditing}
                    label={IUserGenderDict[IUserGender.MALE].label}
                    checked={form.values.gender === IUserGender.MALE}
                    onChange={() =>
                      form.setValues({
                        ...form.values,
                        gender: IUserGender.MALE
                      })
                    }
                  />
                  <Checkbox
                    disabled={!_isEditing}
                    label={IUserGenderDict[IUserGender.FEMALE].label}
                    checked={form.values.gender === IUserGender.FEMALE}
                    onChange={() =>
                      form.setValues({
                        ...form.values,
                        gender: IUserGender.FEMALE
                      })
                    }
                  />
                </Group>
                <TextInput
                  label="Mô tả"
                  placeholder="Nhập mô tả"
                  disabled={!_isEditing}
                  size={'sm'}
                  {...form.getInputProps('description')}
                />
              </Stack>
            </Col>
            <Col span={5} pos={'relative'}>
              <Stack>
                <Text align="left" color="dimmed">
                  Vị trí, chức vụ
                </Text>
                <Select
                  disabled={!_isEditing}
                  data={departments.map(({ name, id }) => ({
                    value: id,
                    label: name
                  }))}
                  label="Phòng ban"
                  placeholder="Chọn phòng ban"
                  {...form.getInputProps('departmentId')}
                />
                <MultiSelect
                  disabled={!_isEditing}
                  data={roles.map(({ name, id }) => ({
                    value: id,
                    label: name
                  }))}
                  label="Vai trò"
                  placeholder="Chọn vai trò"
                  {...form.getInputProps('roleIds')}
                />
              </Stack>
            </Col>
          </Grid>
        </form>
      )}
    </>
  );
};
