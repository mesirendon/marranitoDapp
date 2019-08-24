import Vue from 'vue';
import Vuex from 'vuex';
import Marranito from './modules/Marranito';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Marranito,
  },
});
