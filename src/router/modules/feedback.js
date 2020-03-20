/**
 * 主页 反馈管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/feedback',
        meta: {
            icon: 'md-notifications',
            title: '未开通',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'feedback',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "feedback" */'@/views/other/develop')
            }
        ]
    }
]
