import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { groupPermissionByResourceName } from '@/pages/Permission/helper';
import { RootState } from '@/redux/reducers';
import { IRole } from '@/types/models/IRole';
import { Button, Group, ScrollArea, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { GroupPermissionCollapse } from './GroupPermissionCollapse';
import { RoleActions } from '@/redux/reducers/role/role.action';

interface Props {
  close: () => void;
  role: IRole | null;
}

export const ModalAssignPermission: React.FC<Props> = ({ close, role }) => {
  const dispatch = useAppDispatch();
  const { permission } = useAppSelector((state: RootState) => state.permission);
  const form = useForm();
  const groupPermission = groupPermissionByResourceName(permission);
  const [_permissionIDs, setPermissionIDs] = useState<string[]>([]);

  return (
    <form
      onSubmit={form.onSubmit(() => {
        dispatch(
          RoleActions.assignPermission(
            { permissionIds: _permissionIDs },
            role?.id,
            {
              onSuccess: () => {
                dispatch(RoleActions.getAllRole());
                close();
              }
            }
          )
        );
      })}
    >
      <ScrollArea h={250}>
        <Stack>
          {groupPermission.map((group) => (
            <GroupPermissionCollapse
              groupName={group.resourceName}
              groupPermission={group.permission}
              permissionIDs={_permissionIDs}
              setPermissionID={setPermissionIDs}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Group position="right" mt={'md'}>
        <Button type="submit">Cập nhật</Button>
      </Group>
    </form>
  );
};
