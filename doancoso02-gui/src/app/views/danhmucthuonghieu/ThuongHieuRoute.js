import React from 'react'

const ChatLieuRoute = [
    {
        path: '/danhmucthuonghieu',
        component: React.lazy(() => import('./ThuongHieu')),
    }
]

export default ChatLieuRoute