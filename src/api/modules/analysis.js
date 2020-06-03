/**
 * 统计分析
 */
import instance from '@/api/http'

const module = '/analysis'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
