/* eslint-disable react-hooks/rules-of-hooks */
import appIcon from '@/assets/imgs/logo.jpg';
import CustomLoader from '@/components/custom/CustomLoader';
import { ROUTER } from '@/configs/router';

import { useAuthContext } from '@/hooks/context';
import { useAppDispatch } from '@/hooks/redux';
import { FacilityActions } from '@/redux/reducers/facility/facility.action';
import { RoomActions } from '@/redux/reducers/room/room.action';
import { IUser } from '@/types/models/IUser';
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Button,
  Group,
  Header,
  Image,
  Modal,
  Navbar,
  Popover,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandAsana,
  IconLicense,
  IconLogout,
  IconPassword,
  IconPencil,
  IconUser
} from '@tabler/icons-react';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

interface NavLinkProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
  auth?: boolean;
}

const NavLink = ({ icon, color, label, to }: NavLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

interface UserProps {
  profile?: IUser | null;
}

const User = ({ profile }: UserProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { changePwd } = useAuthContext();

  interface WrapperProps {
    children: ReactNode;
  }

  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
          }
        }}
      >
        {children}
      </UnstyledButton>
    );
  };
  const [opened, { close, open }] = useDisclosure();
  const [_newPwd, setNewPwd] = useState('');
  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`
      }}
    >
      <Modal centered title="Thay đổi mật khẩu" opened={opened} onClose={close}>
        <Stack spacing={'lg'}>
          <TextInput
            onChange={(e) => setNewPwd(e.currentTarget.value)}
            label="Mật khẩu mới"
          />
          <Group position="right">
            <Button variant="outline" onClick={() => close()}>
              Huỷ
            </Button>
            <Button
              onClick={() => {
                changePwd({ password: _newPwd });
                close();
              }}
            >
              Cập nhật
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Popover position={'top-end'} shadow="xs" withArrow arrowSize={10}>
        <Popover.Target>
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0]
              }
            }}
          >
            <Group>
              <Avatar radius="xl" />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {profile?.fullName}
                </Text>
                <Text color="dimmed" size="xs">
                  {profile?.role}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown p={'xs'}>
          <Wrapper>
            <Text onClick={() => navigate(`${ROUTER.PROFILE}`)} fz={'xs'}>
              <Group spacing={2}>
                <IconUser size={'1rem'} />
                Thông tin cá nhân
              </Group>
            </Text>
          </Wrapper>
          <Wrapper>
            <Text onClick={() => open()} fz={'xs'}>
              <Group spacing={2}>
                <IconPassword size={'1rem'} />
                Thay đổi mật khẩu
              </Group>
            </Text>
          </Wrapper>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FacilityActions.getAllFacilities());
    dispatch(RoomActions.getAllRooms());
  }, [dispatch]);

  const handleLogout = () => {
    navigate(ROUTER.LOGIN);
    localStorage.clear();
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to={ROUTER.LOGIN} />;
  }

  // useLayoutEffect(() => {
  //   getProfile();
  // }, [dispatch, getProfile]);

  const navLinks: NavLinkProps[] = [
    // {
    //   icon: <IconUser size={'1rem'} />,
    //   color: 'blue',
    //   label: 'Quản Lý Tài Khoản',
    //   to: ROUTER.USER
    // },
    {
      icon: <IconLicense size={'1rem'} />,
      color: 'yellow',
      label: 'Quản Lý Phòng Học',
      to: ROUTER.ROOM
    },
    {
      icon: <IconPencil size={'1rem'} />,
      color: 'blue',
      label: 'Quản Lý Cơ Sở Vật Chất',
      to: ROUTER.FACILITY
    },
    {
      icon: <IconBrandAsana size="1rem" />,
      color: 'grape',
      label: 'Quản Lý Giáo Viên',
      to: ROUTER.TEACHER
    },
    {
      icon: <IconLicense size={'1rem'} />,
      color: 'pink',
      label: 'Quản Lý Khoá Học',
      to: ROUTER.COURSE
    }
  ];
  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: 'calc(100vw - 32px)'
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={true}
            width={{ sm: 200, lg: 280 }}
          >
            <Navbar.Section grow mt="0">
              <div>
                {navLinks.map((link) => (
                  <NavLink {...link} key={link.label} />
                ))}
              </div>
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.BASE}>
                  <Image src={appIcon} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  HỆ THỐNG QUẢN LÝ HỌC TẬP
                </Text>
              </Group>
              <Group>
                <Button
                  onClick={handleLogout}
                  variant="subtle"
                  color="red"
                  leftIcon={<IconLogout size={20} />}
                >
                  Đăng xuất
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<CustomLoader />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
};

export default ProtectedLayout;
