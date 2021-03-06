/**
 * 主页 产品管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/goods',
        meta: {
            icon: 'md-list',
            title: '未开通',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'goods',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "goods" */'@/views/other/develop')
            }
        ]
    }
]
