import React from 'react'

const DanhMucRoute = [
    {
        path: '/danhmucsanpham',
        component: React.lazy(() => import('./DanhMuc')),
    }
]

export default DanhMucRoute