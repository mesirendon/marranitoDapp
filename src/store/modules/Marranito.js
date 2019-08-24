import Web3 from 'web3';
import MarranitoCompiled from '@/contracts/Marranito.json';
import * as constants from '@/store/constants';
import store from '@/store';

let web3;
if (window.web3)
  web3 = new Web3(window.web3.currentProvider);
if (window.ethereum)
  window.ethereum.on('accountsChanged', ([acc]) => {
    store.dispatch(constants.MARRANITO_GET_ACCOUNT);
  });

let MarranitoAddress = '0x36732Bc544B39E400D99F94Fef73860F462aD27e';

const state = {
  provider: web3 !== undefined,
  instance: null,
  address: null,
  balance: null,
  marranitoBalance: null,
  isOwner: false,
};

const actions = {
  [constants.MARRANITO_GET_ACCOUNT]: ({commit, dispatch}) => {
    web3.eth.getAccounts()
      .then(([myAccount]) => {
        commit(constants.MARRANITO_SET_ACCOUNT, myAccount);
        return web3.eth.getBalance(myAccount);
      })
      .then(balance => {
        commit(constants.MARRANITO_SET_BALANCE, web3.utils.fromWei(balance));
        dispatch(constants.MARRANITO_INIT_CONTRACT);
        return web3.eth.getBalance(MarranitoAddress);
      })
      .then(marranitoBalance => {
        commit(constants.MARRANITO_SET_MARRANITO_BALANCE, web3.utils.fromWei(marranitoBalance));
      })
  },
  [constants.MARRANITO_INIT_CONTRACT]: ({ commit, state }) => {
    const instance = new web3.eth.Contract(MarranitoCompiled.abi, MarranitoAddress);
    commit(constants.MARRANITO_SET_INSTANCE, instance);
    instance.methods.isOwner().call({from: state.address})
      .then(result => {
        commit(constants.MARRANITO_SET_IS_OWNER, result);
      })
  },
  [constants.MARRANITO_SEND_FUNDS]: ({state}, funds) => {
    state.instance.methods.feedMe()
      .send({from: state.address, value: web3.utils.toWei(funds)});
  }
};

const mutations = {
  [constants.MARRANITO_SET_ACCOUNT]: (state, address) => {
    state.address = address;
  },
  [constants.MARRANITO_SET_BALANCE]: (state, balance) => {
    state.balance = balance;
  },
  [constants.MARRANITO_SET_INSTANCE]: (state, instance) => {
    state.instance = instance;
  },
  [constants.MARRANITO_SET_IS_OWNER]: (state, isOwner) => {
    state.isOwner = isOwner;
  },
  [constants.MARRANITO_SET_MARRANITO_BALANCE]: (state, marranitoBalance) => {
    state.marranitoBalance = marranitoBalance;
  }
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
}
