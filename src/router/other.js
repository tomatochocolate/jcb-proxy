/**
 * 其他路由
 */
import Login from '@/views/other/login'
import Errors from '@/views/other/errors'
import Redirect from '@/views/other/redirect'

export default [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        name: 'redirect',
        path: '/redirect/:path*',
        component: Redirect
    },
    {
        name: 'errors.403',
        path: '/403',
        component: Errors
    },
    {
        name: 'errors.404',
        path: '/404',
        component: Errors
    },
    {
        name: 'errors.500',
        path: '/500',
        component: Errors
    },
    {
        path: '*',
        redirect: { name: 'login', replace: true }
    }
]
