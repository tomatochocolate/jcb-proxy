/**
 * 格式化时间
 */
import { dayjs } from '@/libs/utils'

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (date === '') return
    return dayjs(date).format(format)
}
export default formatDate
