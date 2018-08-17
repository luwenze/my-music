import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import $ from 'jquery'

import 'common/less/index.less'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    // error: 'css/img/error.png',
    loading: 'imgPath/photo.png',
    attempt: 5
})
require('./api/mock.js') //引入mock.js文件

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})