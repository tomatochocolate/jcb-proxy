/**
 *
 */
import numeral from './numeral'
import formatDate from './format-date'

const filters = {
    numeral,
    formatDate
}
const install = (Vue, opts = {}) => {
    if (install.installed) return

    Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

export { numeral, formatDate }
export default install
