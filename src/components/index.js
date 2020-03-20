/**
 * install
 */
import Page from './page'

const components = {
    Page
}
const install = (Vue, opts = {}) => {
    if (install.installed) return

    Object.keys(components).forEach(key => Vue.component(key, components[key]))
}

export {
    Page
}
export default install
