/**
 * 卡券
 */
import instance from '@/api/http'

const module = '/card'
/**
 * 查询所有用户
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
/**
 * 查询所有用户
 * @returns { Promise }
 */
export const create = (params) => {
    return instance.post(`${module}/generate`, params)
}
/**
 * 查询所有用户
 * @returns { Promise }
 */
export const update = (params) => {
    return instance.post(`${module}/update`, params)
}
