<template>
  <div class="home">
    <div class="alert alert-danger" role="alert" v-if="!provider">
      No tienes un navegador compatible con la cadena de bloques. Te recomendamos <a
            href="http://metamask.io" target="_blank">MetaMask</a>
    </div>
    <div class="alert alert-warning" role="alert" v-else>
      Vemos que tienes MetaMask instalado. Por favor inicia sesión.
    </div>
    <div id="owner">
      <h1>Bienvenido {ownerAddress}</h1>
      <h2>Saldo</h2>
      <h3>{Saldo}</h3>
      <button class="btn btn-success btn-block">
        Transferir fondos a mi cuenta
      </button>
    </div>
    <div id="contributors">
      <h1>Bienvenido contribuyente {contributorAddress}</h1>
      <p>Por favor contribuye a mi causa:</p>
      <form>
        <div class="form-group">
          <label for="amount">Fondos a transferir (ETH)</label>
          <input type="number" class="form-control" id="amount" placeholder="Ex. 0.5" min="0">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      provider() {
        return this.$web3 !== undefined;
      }
    }
  }
</script>
