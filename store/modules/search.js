const state = {
    keyword: "",
}

const mutations = {
    CHANGE_KEYWORD: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeKeyword({ commit }, data) {
        commit('CHANGE_KEYWORD', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}