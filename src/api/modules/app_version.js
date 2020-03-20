/**
 *  版本
 */
import instance from '@/api/http'

const module = '/client'
export const store = (params) => {
    return instance.post('/app_version', params)
}
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
export const upload = instance.defaults.baseURL + '/app_version/upload'
