import {
  Box,
  Card,
  Collapse,
  Divider,
  Group,
  Switch,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  groupName: string;
  groupPermission: { id: string | undefined; name: string }[];
  permissionIDs: string[];
  setPermissionID: Dispatch<SetStateAction<string[]>>;
}

export const GroupPermissionCollapse: React.FC<Props> = ({
  groupName,
  groupPermission,
  permissionIDs,
  setPermissionID
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  const handleSwitchChange = (id: string | undefined) => {
    if (!id) return;
    if (permissionIDs.includes(id)) {
      setPermissionID((prevPermissions) =>
        prevPermissions.filter((permissionID) => permissionID !== id)
      );
    } else {
      setPermissionID((prevPermissions) => [...prevPermissions, id]);
    }
  };

  return (
    <Box w={'100%'}>
      <Card radius={'sm'} bg={'gray.2'} shadow={'xs'} withBorder p={'xs'}>
        <Group position="apart" w={'100%'} onClick={toggle}>
          <Text>{groupName}</Text>
          {opened ? (
            <IconCaretUp size={'1rem'} />
          ) : (
            <IconCaretDown size={'1rem'} />
          )}
        </Group>
      </Card>

      <Collapse in={opened}>
        {groupPermission.map((permission) => (
          <Box px={'xs'}>
            <Group key={permission.id} position="apart" my={'xs'}>
              <Text>{permission.name}</Text>
              <Switch
                onChange={() => handleSwitchChange(permission.id)}
                checked={permissionIDs.includes(permission.id || '')}
              />
            </Group>
            <Divider mt={'xs'} />
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};
