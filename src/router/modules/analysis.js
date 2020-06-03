/**
 * 主页 统计分析
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/analysis',
        meta: {
            icon: 'ios-people',
            title: '统计分析',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'analysis',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "agent" */'@/views/analysis')
            }
        ]
    }
]
