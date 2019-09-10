<template>
  <q-page padding class="bg-primary ">
    <div>
      <div>
        <div>Welcome To</div>
        <div>DAC</div>
        <div>• Factory •</div>
      </div>

      <q-btn
        v-if="!getAccountName"
        label="login"
        @click="$store.dispatch('ual/renderLoginModal')"
        color="secondary"
      />
      <q-btn v-if="getAccountName" label="logout" @click="$store.dispatch('ual/logout')" color="secondary"/>

      <q-btn v-if="getAccountName" label="transfer" @click="transfer" color="info"/>

      <span>{{getAccountName}}</span>
    </div>
    <!-- <img src="statics/images/diagonal.svg" width="100%" class="absolute-bottom"/> -->
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    dologin() {},
    async transfer() {
      let actions = [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: this.getAccountName,
            to: "piecesnbitss",
            quantity: "1.0000 EOS",
            memo: ""
          }
        }
      ];
      this.$store.dispatch("ual/transact", { actions: actions });
    }
  }
};
</script>
