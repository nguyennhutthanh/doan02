import React from 'react'

const ChatLieuRoute = [
    {
        path: '/danhmucchatlieu',
        component: React.lazy(() => import('./ChatLieu')),
    }
]

export default ChatLieuRoute