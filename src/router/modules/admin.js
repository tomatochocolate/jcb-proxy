/**
 * 主页 卡券管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/admin',
        meta: {
            icon: 'md-ionic',
            title: '未开通',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'admin',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "admin" */'@/views/other/develop')
            }
        ]
    }
]
