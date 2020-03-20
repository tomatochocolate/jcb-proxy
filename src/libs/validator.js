/**
 * 验证规则
 */

/**
 * @descrition:手机号码段规则
 * 13段：130、131、132、133、134、135、136、137、138、139
 * 14段：145、147
 * 15段：150、151、152、153、155、156、157、158、159
 * 17段：170、176、177、178
 * 18段：180、181、182、183、184、185、186、187、188、189
 * 国际码 如：中国(+86)
 */
// eslint-disable-next-line
export const phone = /^(13[0-9]|14[57]|15[012356789]|17[0-8]|18[0-9])\d{8}$|^0\d{2,3}-?\d{7,8}$|^[48]00\d{7}$/
