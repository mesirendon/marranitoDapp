import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Web3 from 'web3';

Vue.config.productionTip = false;

window.addEventListener('load', () => {
  if (web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
    Vue.prototype.$web3 = web3;
    console.log('Detectamos metamask')
  }
  else {
    console.warn('No hay metamask');
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
