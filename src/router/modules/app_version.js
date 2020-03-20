/**
 * 主页 App版本管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/app_version',
        meta: {
            icon: 'ios-appstore',
            title: '未开通',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'appVersion',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "app_version" */'@/views/other/develop')
            }
        ]
    }
]
