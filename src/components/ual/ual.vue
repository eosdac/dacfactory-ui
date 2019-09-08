<template>
  <div>
    <q-dialog v-model="getShow" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class=" text-white">
        <q-bar class="bg-primary">
          <!-- <q-icon name="network_wifi" />
          <q-icon name="network_cell" />
          <q-icon name="battery_full" />
          <div>9:34</div> -->
          <div>{{msg}}</div>
          <q-space />
          <q-btn dense flat icon="close" @click="$store.commit('ual/setShow', false); msg=''">
            <q-tooltip content-class="bg-grey text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-list>
            <q-item v-for="(w, i) in walletlist" :key="`w${i}`" :style="'background-color:' + w.background" @click="connectWallet(w)" clickable v-ripple>
              <q-item-section avatar>
                <q-spinner v-if="w.loading" size="30px"/>
                <img v-else :src="w.icon"  height='30'>
              </q-item-section>
              <q-item-section :style="'color:'+w.textColor">
                {{w.text}}
              </q-item-section>
            </q-item>
          </q-list>

         
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { UAL } from "universal-authenticator-library";
import { mapGetters } from "vuex";
export default {
  name: 'UAL',
  props: ["chains", "wallets", "appName"],
  data () {
    return {
      ual: null,
      walletlist: [],
      msg:'',

      authenticator:null


    }
  },
  computed: {
    ...mapGetters({
      getShow: "ual/getShow",
      getAuthenticator: "ual/getAuthenticator",
      getTestAccountName: 'ual/getTestAccountName'
    })
  },
  methods:{
    async connectWallet(wallet){
      wallet.loading = true;
      let name = wallet.name;
      this.msg = `Connecting to ${name} ...`;
      let authenticator = this.ual.authenticators.find(
        auth => auth.constructor.name == name
      );
      this.$store.commit('ual/setAuthenticator', authenticator);
      let users;
      try {
        await this.getAuthenticator.init();
        if(this.getTestAccountName){
          users = await this.getAuthenticator.login(this.getTestAccountName);
        }
        else{
          users = await this.getAuthenticator.login();
        }
        const accountName = await users[0].getAccountName();
        wallet.loading = false;
        this.$store.commit('ual/setLoggedIn', accountName);
        this.$store.commit('ual/setShow', false);
        this.msg = '';

      } catch (err) {
        wallet.loading = false;
        let m = "Service unavailable";
        if (this.getAuthenticator) {
          m = this.getAuthenticator.getError() || err;
          m += `</br> <a target="_blank" href=${this.getAuthenticator.getOnboardingLink()}>${
            this.getAuthenticator.constructor.name
          } Website</a>`;
        }
        this.msg = m;
      }
    }

  },
  mounted(){
    this.wallets.forEach(w => {
      let obj = w.getStyle();
      obj.loading = false;
      obj.name = w.constructor.name;
      this.walletlist.push(obj);
    });
    this.ual = new UAL(this.chains, this.appName, this.wallets);
    
  }

}
</script>

<style>
</style>
