/**
 *  反馈
 */
import instance from '@/api/http'

const module = '/member/feedback'
export const list = (params) => {
    return instance.post(`${module}/list`, { params })
}
export const reply = (params) => {
    return instance.post(`${module}/reply`, params)
}
