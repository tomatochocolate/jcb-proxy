/**
 * 主页 订单管理
 */
import Main from '@/views/other/main'
export default [
    {
        path: '/order',
        meta: {
            icon: 'md-reorder',
            title: '订单管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'order',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "order" */'@/views/order')
            }
        ]
    }
]
