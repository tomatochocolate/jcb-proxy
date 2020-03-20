/**
 * 广告
 */
import instance from '@/api/http'

const module = '/advert'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
