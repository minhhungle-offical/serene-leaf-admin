import { categoryGetAll } from '@/stores/slices/categorySlice'
import { postCategoryGetAll } from '@/stores/slices/postCategorySlice'
import BarChartIcon from '@mui/icons-material/BarChart'
import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import ArticleIcon from '@mui/icons-material/Article'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { NavBar } from '../Common/NavBar'

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
    icon: <CategoryIcon />,
    label: 'Categories',
    href: '/dashboard/categories',
  },
  {
    icon: <LocalCafeIcon />,
    label: 'Products',
    href: '/dashboard/products',
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
    icon: <ArticleIcon />,
    label: 'Post',
    href: '/dashboard/posts',
  },
  {
    icon: <CategoryIcon />,
    label: 'Post Categories',
    href: '/dashboard/post-categories',
  },
]

export const MainLayout = ({ children }) => {
  const divRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(categoryGetAll())
    dispatch(postCategoryGetAll())
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
