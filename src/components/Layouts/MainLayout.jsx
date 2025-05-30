import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { NavBar } from '../Common/NavBar'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { categoryGetAll } from '@/stores/slices/categorySlice'

const drawerWidth = 240

const navList = [
  {
    icon: <DashboardIcon />,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <BarChartIcon />,
    label: 'Analytics',
    href: '/dashboard/analytics',
  },
  {
    icon: <LocalCafeIcon />,
    label: 'Products',
    href: '/dashboard/products',
  },
  {
    icon: <CategoryIcon />,
    label: 'Categories',
    href: '/dashboard/categories',
  },
  {
    icon: <ShoppingCartIcon />,
    label: 'Orders',
    href: '/dashboard/orders',
  },
  {
    icon: <PeopleIcon />,
    label: 'Customers',
    href: '/dashboard/customers',
  },

  {
    icon: <SettingsIcon />,
    label: 'Settings',
    href: '/dashboard/settings',
  },
]

export const MainLayout = ({ children }) => {
  const divRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(categoryGetAll())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    divRef.current?.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [location])

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }
  return (
    <Stack direction="row" height="100vh" overflow="hidden" sx={{ backgroundColor: '#f0f0f0' }}>
      <Box
        sx={{
          width: drawerWidth,
          height: '100vh',
          overflow: 'auto',
        }}
        boxShadow={3}
      >
        <Box sx={{ p: 2, height: '100%' }}>
          <NavBar navList={navList} pathname={location.pathname} />
        </Box>
      </Box>

      <Box
        ref={divRef}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ height: '100%' }}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Stack>
  )
}
