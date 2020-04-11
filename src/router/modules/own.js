/**
 * 主页 自有用户列表
 */
import Main from '@/views/other/main'
export default [
    {
        path: '/own',
        meta: {
            icon: 'md-reorder',
            title: '用户数据统计',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'own',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "order" */'@/views/own')
            }
        ]
    }
]
