import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// #ifdef MP-WEIXIN 
let isWx = true;
// #endif

const store = new Vuex.Store({
    state: {
		comments: [],
		isWx
	},
    mutations: {},
    actions: {}
})
export default store