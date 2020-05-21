/**
 *  数据统计
 */
import instance from '@/api/http'

const module = '/admin/query'
/**
 * 数据统计列表
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/members`, params)
}
