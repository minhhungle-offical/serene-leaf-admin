import { MainLayout } from '@/components/Layouts/MainLayout'
import { NotFound } from '@/features/NotFound/NotFound'
import { LinearProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const Products = lazy(() => import('@/features/Products/pages/Products'))
const Categories = lazy(() => import('@/features/Categories/pages/Categories'))
const PostCategories = lazy(() => import('@/features/PostCategories/pages/PostCategories'))
const Posts = lazy(() => import('@/features/Posts/pages/Posts'))

export default function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="products" />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="post-categories" element={<PostCategories />} />
          <Route path="posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </MainLayout>
    </Suspense>
  )
}
