/**
 * app
 */
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
    user: {},
    token: '',

    menus: [],
    caches: [],
    routes: [],
    homeRoute: {},
    openNames: [],
    activeName: '',
    breadcrumbs: [],
    currentRoute: {},
    tagsList: [],
    breakpoints: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
