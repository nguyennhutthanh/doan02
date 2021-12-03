import React from 'react'

const DonHangRoute = [
    {
        path: '/danhmucdonhang',
        component: React.lazy(() => import('./DonHang')),
    }
]

export default DonHangRoute