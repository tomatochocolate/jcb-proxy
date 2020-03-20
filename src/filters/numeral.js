/**
 * 格式化时间
 */
import { isNull, numeral } from '@/libs/utils'

export default (value = 0, format = '0,0[.]0') => {
    if (isNull(value)) return
    return numeral('' + value).format(format)
}
