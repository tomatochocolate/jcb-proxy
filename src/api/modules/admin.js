/**
 * 管理员
 */
import instance from '@/api/http'

const module = '/admin'
export const store = (params) => {
    return instance.post('/goods', params)
}
/**
 * 查询所有管理员列表
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/adminlist`, params)
}
/**
 *补充代理商账号
 * @returns { Promise }
 */
export const proxysupplement = (params) => {
    return instance.post(`${module}/proxysupplement`, params)
}
/**
 * 添加用户套餐记录
 * @returns { Promise }
 */
export const membersupplement = (params) => {
    return instance.post(`${module}/membersupplement`, params)
}
/**
 * 添加管理员
 * @returns { Promise }
 */
export const add = (params) => {
    return instance.post(`${module}/add`, params)
}
/**
 * 管理员编辑
 * @returns { Promise }
 */
export const update = (params) => {
    return instance.post(`${module}/update`, params)
}
/**
 * 修改密码
 * @returns { Promise }
 */
export const modifyPassword = (params) => {
    return instance.post(`${module}/modifyPassword`, params)
}