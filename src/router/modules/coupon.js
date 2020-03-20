/**
 * 主页 卡券管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/coupon',
        meta: {
            icon: 'md-ionic',
            title: '卡券管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'coupon',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "coupon" */'@/views/coupon')
            }
        ]
    }
]
