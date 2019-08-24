import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Web3 from 'web3';

Vue.config.productionTip = false;

window.addEventListener('load', () => {
  if (web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
    Vue.prototype.$web3 = web3;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
