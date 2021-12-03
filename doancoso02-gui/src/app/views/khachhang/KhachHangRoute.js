import React from 'react'

const KhachHangRoute = [
    {
        path: '/khachhang',
        component: React.lazy(() => import('./KhachHang')),
    }
]

export default KhachHangRoute