import React from 'react'

const ChatLieuRoute = [
    {
        path: '/danhmucrooms',
        component: React.lazy(() => import('./Rooms')),
    }
]

export default ChatLieuRoute