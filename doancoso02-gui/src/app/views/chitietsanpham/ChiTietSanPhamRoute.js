import React from 'react'

const ChiTietSanPhamRoute = [
    {
        path: '/chitietsanpham',
        component: React.lazy(() => import('./ChiTietSanPham')),
    }
]

export default ChiTietSanPhamRoute