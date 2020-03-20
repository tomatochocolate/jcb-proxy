/**
 * 主页 控制台
 */
import Main from '@/views/other/main'
import Home from '@/views/home'

export default [
    {
        path: '',
        meta: {
            icon: 'md-home',
            title: '控制台',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'home',
                path: '',
                meta: {
                    menu: false
                },
                component: Home
            }
        ]
    }
]
