import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import firebase from './service/plugin'

Vue.use(firebase, {
  apiKey: "AIzaSyDcpCExzu4J1K3Va--gukmw6vHCBkk-0RY",
  authDomain: "taller-4.firebaseapp.com",
  databaseURL: "https://taller-4.firebaseio.com",
  projectId: "taller-4",
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
