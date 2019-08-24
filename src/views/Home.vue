<template>
  <div class="home">
    <div class="alert alert-danger" role="alert" v-if="!provider">
      No tienes un navegador compatible con la cadena de bloques. Te recomendamos <a
            href="http://metamask.io" target="_blank">MetaMask</a>
    </div>
    <div v-else>
      <div class="alert alert-warning" role="alert" v-if="!address">
        Vemos que tienes MetaMask instalado. Por favor inicia sesión.
      </div>
      <div v-else>
        <div id="owner" v-if="isOwner">
          <h1>Bienvenido {{address}}</h1>
          <h2>Saldo: {{balance}}</h2>
          <h2>Saldo del marranito: {{marranitoBalance}}</h2>
          <button class="btn btn-success btn-block">
            Transferir fondos a mi cuenta
          </button>
        </div>
        <div id="contributors">
          <h1>Bienvenido contribuyente {{address}}</h1>
          <p>Por favor contribuye a mi causa:</p>
          <form @submit.prevent="sendFunds(amount)">
            <div class="form-group">
              <label for="amount">Fondos a transferir (ETH)</label>
              <input type="text" class="form-control" id="amount" placeholder="Ex. 0.5" min="0"
                     v-model="amount">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'home',
    data() {
      return {
        amount: null,
      }
    },
    computed: {
      ...mapState({
        provider: state => state.Marranito.provider,
        address: state => state.Marranito.address,
        balance: state => `${state.Marranito.balance} ETH`,
        marranitoBalance: state => `${state.Marranito.marranitoBalance} ETH`,
        isOwner: state => state.Marranito.isOwner,
      })
    },
    methods: {
      ...mapActions({
        getAccount: constants.MARRANITO_GET_ACCOUNT,
        init: constants.MARRANITO_INIT_CONTRACT,
        sendFunds: constants.MARRANITO_SEND_FUNDS,
      }),
    },
    created() {
      this.getAccount();
      this.init();
    }
  }
</script>
