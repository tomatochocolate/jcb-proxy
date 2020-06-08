/**
 * 统计分析
 */
import instance from '@/api/http'

const module = '/analysis'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}

export const lineData = (params) => {
    return instance.post(`/admin/echarts/member?id=12365`, params)
}

export const channelData = (params) => {
    return instance.post(`/admin/channel/statistics?id=12365`, params)
}

