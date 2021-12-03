import React from 'react'

const KhuyenMaiRoute = [
    {
        path: '/danhmuckhuyenmai',
        component: React.lazy(() => import('./KhuyenMai')),
    }
]

export default KhuyenMaiRoute