/**
 * 主页 用户管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/user',
        meta: {
            icon: 'md-person',
            title: '用户管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'user',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "user" */'@/views/user')
            }
        ]
    }
]
