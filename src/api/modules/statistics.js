/**
 *  运营渠道
 */
import instance from '@/api/http'

const module = '/stat'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
export const channel = () => {
    return instance.get('/channel/list')
}
export const adcost = (params) => {
    return instance.post('/statistics/adcost', params)
}
