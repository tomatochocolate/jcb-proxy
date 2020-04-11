/**
 *  登录
 */
import instance from '@/api/http'


// /**
//  * 登录
//  * @param { Object } params
//  * @param { String } params.account - 用户名
//  * @param { String } params.password
//  * @returns { Promise }
//  */
// export const login = (params) => {
//     return instance.post('/admin/login', params)
// }

/**
 * 登录
 * @param { Object } params
 * @param { String } params.account - 用户名
 * @param { String } params.password
 * @returns { Promise }
 */
export const login = (params) => {
    return instance.post('/admin/proxy/login', params)
}
