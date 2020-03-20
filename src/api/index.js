/**
 * 全局接口管理
 */
import axios from 'axios/dist/axios'

import instance from './http'
import * as user from './modules/user'
import * as node from './modules/node'
import * as advert from './modules/advert'
import * as order from './modules/order'
import * as goods from './modules/goods'
import * as system from './modules/system'
import * as feedback from './modules/feedback'
import * as statistics from './modules/statistics'
import * as appVersion from './modules/app_version'
import * as coupon from './modules/coupon'
import * as agent from './modules/agent'
import * as admin from './modules/admin'

export {
    axios, instance,

    // modules
    user,
    node,
    advert,
    order,
    goods,
    system,
    feedback,
    statistics,
    appVersion,
    coupon,
    agent,
    admin
}
