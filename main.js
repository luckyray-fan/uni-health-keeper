import Vue from 'vue'
import App from './App'
import 'main.scss'
// import 'weapp-cookie'
import amap from './lib/amap-wx.js'
import {
	http,
	pureHttp
} from './utils/http.js'
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.http = http;
Vue.prototype.pureHttp = pureHttp;
Vue.prototype.amapPlugin = new amap.AMapWX({
	key: '07c7add74c03d9edad5ea77df9c6b89c'
});
const app = new Vue({
	...App,
	store
})
app.$mount()
