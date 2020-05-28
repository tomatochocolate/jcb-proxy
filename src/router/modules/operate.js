/**
 * 主页 运营统计
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/operate',
        meta: {
            icon: 'md-person',
            title: '运营统计',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'operate',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "user" */'@/views/operate')
            }
        ]
    }
]
