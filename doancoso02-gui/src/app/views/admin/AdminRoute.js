import React from 'react'

const AdminRoute = [
    {
        path: '/admin',
        component: React.lazy(() => import('./Admin')),
    }
]

export default AdminRoute