import React from 'react'

const ChatLieuRoute = [
    {
        path: '/danhmuclienhe',
        component: React.lazy(() => import('./LienHe')),
    }
]

export default ChatLieuRoute