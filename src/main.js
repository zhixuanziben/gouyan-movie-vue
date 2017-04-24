import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import loading from './components/loading/loading'

Vue.config.productionTip = false
Vue.use(vueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, loading }
})
