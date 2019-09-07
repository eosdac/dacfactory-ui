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
  computed: {
    ...mapGetters({
      getLoggedIn: "ual/getLoggedIn"
    })
  },
  methods: {
    async transfer() {
      let actions = [
        {
          account: "kasdactokens",
          name: "transfer",
          data: {
            from: this.getLoggedIn,
            to: "piecesnbitss",
            quantity: "1.0000 KASDAC",
            memo: ""
          }
        }
      ];
      this.$store.dispatch('ual/transact', {actions: actions})
    }
  }
};
</script>
