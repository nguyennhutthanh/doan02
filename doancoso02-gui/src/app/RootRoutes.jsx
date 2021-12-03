import React from 'react'
import { Redirect } from 'react-router-dom'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import danhmucRoutes from './views/danhmucsanpham/DanhMucRoute'
import chatlieuRoute from './views/danhmucchatlieu/ChatLieuRoute'
import thuonghieuRoute from './views/danhmucthuonghieu/ThuongHieuRoute'
import chitietSpRoute from './views/chitietsanpham/ChiTietSanPhamRoute'
import KhuyenMaiRoute from './views/danhmuckhuyenmai/KhuyenMaiRoute'
import LienHeRoute from './views/danhmuclienhe/LienHeRoute'
import AdminRoute from './views/admin/AdminRoute'
import DonHangRoute from './views/danhmucdonhang/DonHangRoute'
import BinhLuanRoute from './views/danhmucbinhluan/BinhLuanRoute'
import DanhMucRoomRoute from './views/danhmucroom/DanhMucRoomRoute'
import KhachHangRoute from './views/khachhang/KhachHangRoute'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/signin" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...redirectRoute,
    ...danhmucRoutes,
    ...chatlieuRoute,
    ...thuonghieuRoute,
    ...chitietSpRoute,
    ...KhuyenMaiRoute,
    ...LienHeRoute,
    ...AdminRoute,
    ...DonHangRoute,
    ...BinhLuanRoute,
    ...DanhMucRoomRoute,
    ...KhachHangRoute,
    ...errorRoute,
]

export default routes
