/**
 * 代理
 */
import instance from '@/api/http'

const module = '/cardproxy'
/**
 * 查询所有下级代理商
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
/**
 * 添加代理商
 * @returns { Promise }
 */
export const add = (params) => {
    return instance.post(`${module}/add`, params)
}
/**
 * 修改代理商资料
 * @returns { Promise }
 */
export const update = (params) => {
    return instance.post(`${module}/update`, params)
}
/**
 * 查询代理商卡片余额
 * @returns { Promise }
 */
export const queryCNum = (params) => {
    return instance.post(`${module}/queryCNum`, params)
}
/**
 * 分配代理商卡片余额
 * @returns { Promise }
 */
export const planCNum = (params) => {
    return instance.post(`${module}/planCNum`, params)
}
/**
 * 启用或禁用代理商
 * @returns { Promise }
 */
export const enableOrDisable = (params) => {
    return instance.post(`${module}/enableOrDisable`, params)
}


