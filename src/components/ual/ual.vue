<template>
  <div>
    <q-dialog v-model="getShow" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="text-white" style="width:350px">
        <q-bar class="bg-primary">
          <div>{{bar_msg}}</div>
          <q-space />
          <q-btn dense flat icon="close" @click="$store.commit('ual/setShow', false); resetUI()">
            <q-tooltip content-class="bg-grey text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            animated
            arrows
            control-color="red"
            class="no-padding"
          >
            <q-carousel-slide name="wallet_selection" class="column no-wrap no-padding">
              
                
                  <q-item
                    v-for="(w, i) in walletlist"
                    :key="`w${i}`"
                    :style="'background-color:' + w.background"
                    @click="handleWalletClick(w)"
                    clickable
                    v-ripple
                    class="rounded-borders q-mb-sm text-center"
                    :class="{'authenticator_not_available': get_authenticator_by_name(w.name).initError}"
                  >
                    <q-item-section avatar>
                      <q-spinner v-if="w.loading" size="30px" />
                      <img v-else :src="w.icon" height="30" />
                    </q-item-section>
                    <q-item-section :style="'color:'+w.textColor">{{w.text}}</q-item-section>
                    <q-item-section side>
                      <div v-if="!get_authenticator_by_name(w.name).initError">x</div>
                    </q-item-section>
                  </q-item>
                
              
            </q-carousel-slide>

            <q-carousel-slide name="accountname_input" class="column no-wrap justify-between">
              <div class="text-black">Input your accountname</div>
              <q-input type="text" v-model="accountname" autofocus />
              <div class="column">
                <q-btn label="continue" color="primary" class="full-width" @click="connectWallet(clicked_wallet_btn)"/>
                <q-btn label="back" flat color="primary" class="q-mt-sm" @click="resetUI" />
              </div>
            </q-carousel-slide>

            <q-carousel-slide name="error" class="column no-wrap justify-between">
              <div class="text-red">{{error_msg}}</div>
              <div class="column">
                <q-btn label="back" flat color="primary" class="q-mt-sm" @click="resetUI" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { UAL } from "universal-authenticator-library";
import { mapGetters } from "vuex";
export default {
  name: "UAL",
  props: ["chains", "authenticators", "appName"],
  data() {
    return {
      ual: null,
      walletlist: [],
      bar_msg: "",
      error_msg: "",

      clicked_wallet_btn: null,

      slide: "wallet_selection",
      accountname: "",

      authenticator: null
    };
  },
  computed: {
    ...mapGetters({
      getShow: "ual/getShow",
      getAuthenticator: "ual/getAuthenticator",
      getTestAccountName: "ual/getTestAccountName"
    })
  },
  methods: {
    async handleWalletClick(wallet) {
      let authenticator = this.get_authenticator_by_name(wallet.name);
      let shouldRequestAccountName = await authenticator.shouldRequestAccountName();
      if(shouldRequestAccountName){
        this.clicked_wallet_btn = wallet;
        this.bar_msg = wallet.name;
        this.slide ="accountname_input";
      }
      else{
        this.connectWallet(wallet);
      }
    },
    get_authenticator_by_name(name) {
      return this.ual.authenticators.find(auth =>
        auth.getStyle().text == name
        );
    },
    async connectWallet(wallet) {
      wallet.loading = true;
      let name = wallet.name;
      this.bar_msg = `Connecting to ${name} ...`;

      let authenticator = this.get_authenticator_by_name(name);
      this.$store.commit("ual/setAuthenticator", authenticator);
      let users;
      try {
        console.log("authenticator object", authenticator);
        if (this.accountname) {
          console.log("login authenticator");
          users = await authenticator
            .login(this.accountname)
            .catch(e => {
              console.log("authenticator login error cause",  e.cause);
              this.error_msg = e;
            });
        } else {
          users = await authenticator.login();
        }
        if(!users){
          return;
        }
        const accountName = await users[0].getAccountName();
        wallet.loading = false;
        this.$store.commit("ual/setLoggedIn", accountName);
        this.$store.commit("ual/setShow", false);
        this.resetUI();
      } catch (err) {
        wallet.loading = false;
        this.bar_msg = "";
        let m = "Service unavailable";
        if (this.getAuthenticator) {
          m = this.getAuthenticator.getError() || err;
          m += ` ${this.getAuthenticator.getStyle().text}`;
          m += ` ${this.getAuthenticator.getOnboardingLink()}`;
        }
        this.error_msg = m;
      }
    },
    resetUI() {
      this.walletlist.forEach(w => {
        w.loading = false;
        this.get_authenticator_by_name(w.name).reset();
      });
      this.bar_msg = "";
      this.error_msg = "";
      this.slide = "wallet_selection";
      this.accountname = "";
    }
  },
  mounted() {
    this.authenticators.forEach(w => {
      let obj = w.getStyle();
      obj.loading = false;
      obj.name = obj.text;
      this.walletlist.push(obj);
      //init authenticator to check availability
      w.init().then(() => {
        console.log(`init ${obj.name} done`);
      });
    });
    this.ual = new UAL(this.chains, this.appName, this.authenticators);
  },
  watch: {
    error_msg: function(newv, oldv) {
      console.log("oldv", oldv);
      console.log("newv", newv);
      if (newv) {
        this.slide = "error";
      }
    }
  }
};
</script>

<style>
.authenticator_not_available{
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;
  filter: alpha(opacity=50);
  background-color:#C6C6C6 !important;
  order:1;

}
</style>
