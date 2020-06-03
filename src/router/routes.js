/**
 * 主要路由导出
 */
import home from './modules/home'
import user from './modules/user'
import advert from './modules/advert'
import node from './modules/node'
import agent from './modules/agent'
import goods from './modules/goods'
import order from './modules/order'
import feedback from './modules/feedback'
import appVersion from './modules/app_version'
import statistics from './modules/statistics'
import coupon from './modules/coupon'
import admin from './modules/admin'
import own from './modules/own'
import operate from './modules/operate'
import analysis from './modules/analysis'

export default [
    ...home,
    ...agent,
    ...coupon,
    // ...node,
    // ...order,
    // ...feedback,
    // ...appVersion,
    // ...statistics,
    // ...advert,
    // ...user,
    // ...goods,
    // ...admin,
    ...own,
    ...operate,
    ...analysis
]
