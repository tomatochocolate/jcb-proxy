import Vue from 'vue'

import ViewUI from '@/libs/vendors/view-design'
import ready from '@/mixins/ready'
import events from '@/libs/vendors/events'
import filters from '@/filters'
import components from '@/components'
import storage from '@/libs/storage'
import router from '@/router'
import store from '@/store'

import App from '@/App'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ViewUI)
Vue.use(events)
Vue.use(filters)
Vue.use(components)
Vue.mixin(ready)
Vue.prototype.$closePage = (payload) => {
    store.dispatch('app/closePage', payload)
}
Vue.prototype.$updatePage = (payload = {}) => {
    store.dispatch('app/updatePage', payload)
}
if (storage.has('token') && storage.has('user')) {
    store.dispatch('app/login', {
        user: storage.get('user', {}),
        token: storage.get('token', '')
    })
}
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {

    //获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem("token");

    //如果登录标志存在且为isLogin，即用户已登录
    if (getFlag != null) {
        
        //设置vuex登录状态为已登录
        next()

        //如果已登录，还想想进入登录注册界面，则定向回首页
        if (!to.meta.isLogin) {
            //iViewUi友好提示
            // alert('请先退出登录')
            // next({
            //     path: '/home'
            // })
            
        }

        //如果登录标志不存在，即未登录
    } else {
        
        window.location.reload()
    }

});

