/**
 * 产品
 */
import instance from '@/api/http'

const module = '/goods'
export const store = (params) => {
    return instance.post('/goods', params)
}
export const update = (params) => {
    return instance.post('/goods/update', params)
}
/**
 * 查询所有套餐列表
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
/**
 * 添加套餐
 * @returns { Promise }
 */
export const addorupdate = (params) => {
    return instance.post(`${module}/addorupdate`, params)
}
