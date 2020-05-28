/**
 *  运营
 */
import instance from '@/api/http'

const module = '/member/buy/goods'
/**
 * 运营
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
