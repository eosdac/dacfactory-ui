<template>
  <q-page padding>
    <q-btn v-if="!getLoggedIn" label="login" @click="$store.dispatch('ual/login')" />
    <q-btn v-if="getLoggedIn" label="logout" @click="$store.dispatch('ual/logout')" />
    <q-btn v-if="getLoggedIn" label="transfer" @click="transfer" />

    <span>{{getLoggedIn}}</span>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      getLoggedIn: "ual/getLoggedIn",
      getTestAccountName: 'ual/getTestAccountName'
    })
  },
  methods: {
    dologin(){

    },
    async transfer() {
      let actions = [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: this.getLoggedIn,
            to: "piecesnbitss",
            quantity: "1.0000 EOS",
            memo: ""
          }
        }
      ];
      this.$store.dispatch('ual/transact', {actions: actions})
    }
  }
};
</script>
