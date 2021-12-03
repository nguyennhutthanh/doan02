import NotFound from './NotFound'

import JwtLogin from './login/JwtLogin'

const sessionRoutes = [
    {
        path: '/signin',
        component: JwtLogin,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
