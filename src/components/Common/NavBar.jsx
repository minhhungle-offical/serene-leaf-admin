import logo from '@/assets/images/logo.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'

export function NavBar({
  profile,
  navList,
  pathname,
  drawerWidth = 240,
  mobileOpen,
  onDrawerToggle,
  onLogout,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const drawerContent = (
    <Stack
      sx={{
        height: '100%',
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', p: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Box component="img" src={logo} alt="serene leaf" sx={{ width: '100%' }} />
        </Box>
        {isMobile && (
          <IconButton onClick={onDrawerToggle} sx={{ color: '#000' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>

      <List>
        {navList.map((item) => {
          const isActive = pathname === item.href
          return (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.href}
                sx={{
                  color: '#000',
                  bgcolor: isActive ? '#f0f0f0' : 'transparent',
                  fontWeight: isActive ? 600 : 'normal',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#000', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box flexGrow={1} />

      <Box
        px={2}
        py={2}
        sx={{
          borderTop: '1px solid rgba(0,0,0,0.1)',
          backgroundColor: '#fafafa',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
            p: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <AccountCircleIcon sx={{ width: 40, height: 40, mr: 1.5 }} />

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              {profile?.role || 'Vai trò'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.700' }}>
              {profile?.name || 'Tên người dùng'}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          size="small"
          fullWidth
          onClick={onLogout}
          sx={{
            textTransform: 'none',
            borderColor: 'rgba(0,0,0,0.2)',
            color: '#000',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              borderColor: 'rgba(0,0,0,0.4)',
            },
          }}
        >
          Đăng xuất
        </Button>
      </Box>
    </Stack>
  )

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            color: '#000',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  )
}
