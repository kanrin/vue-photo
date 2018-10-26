import Vue from 'vue'
import VuePhotoSwipe from 'vue-photoswipe'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(VuePhotoSwipe)

new Vue({
  render: h => h(App)
}).$mount('#app')
