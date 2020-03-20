/**
 * 主页 广告管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/advert',
        meta: {
            icon: 'md-ionic',
            title: '未开通',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'advert',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "advert" */'@/views/other/develop')
            }
        ]
    }
]
