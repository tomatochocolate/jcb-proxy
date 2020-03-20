/**
 * 节点
 */
import instance from '@/api/http'

const module = '/vpn'
export const list = (params) => {
    return instance.post(`${module}/nodes`, params)
}

