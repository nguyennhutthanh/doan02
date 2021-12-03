import React from 'react'

const BinhLuanRoute = [
    {
        path: '/danhmucbinhluan',
        component: React.lazy(() => import('./BinhLuan')),
    }
]

export default BinhLuanRoute