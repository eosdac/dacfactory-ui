<template>
  <section :class="['card', hint ? 'first-card' : 'second-card']">
    <h3 class="card-header">{{ header }}</h3>
    <p class="eos-quantity">{{ eosQuantity }}<span>EOS</span></p>
    <p class="or">or</p>
    <p class="eosdac-quantity">{{ eosDacQuantity }}<span>EOSDAC</span></p>
    <p class="time-info">{{ timeInfo }}</p>
    <p class="hint" v-if="hint">{{ hint }}<span class="question">?</span></p>
    <div class="card-footer">
      <q-btn label="buy" color="secondary" class="q-mt-md" @click="onClickTransfer" v-if="!isShowChoice" />
      <div v-else class="choose-token-wrapper">
        <q-btn :label="EOS_TOKEN" color="secondary" class="q-mt-md" @click="transfer(EOS_TOKEN)" />
        <q-btn :label="DAC_TOKEN" color="secondary" class="q-mt-md" @click="transfer(DAC_TOKEN)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isShowChoice: false,
      EOS_TOKEN: "EOS",
      DAC_TOKEN: "DAC"
    };
  },
  props: {
    header: {
      type: String,
      require: true
    },
    eosQuantity: {
      type: String,
      require: true
    },
    eosDacQuantity: {
      type: String,
      require: true
    },
    timeInfo: {
      type: String,
      require: true
    },
    hint: {
      type: String,
      require: false
    },
    isAgree: {
      type: Boolean,
      required: true
    },
    onCheckboxError: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    onClickTransfer() {
      this.isShowChoice = true;
    },
    transfer(payTokenSymbol) {
      if (!this.isAgree) {
        this.onCheckboxError();
        return;
      }

      const {
        factory: { stepsData },
        ual: { activeAuthenticator, accountName }
      } = this.$store.state;
      if (!activeAuthenticator || !accountName) {
        this.$store.dispatch("ual/renderLoginModal");
        return;
      }

      const payTokenQuantity = payTokenSymbol === this.EOS_TOKEN
          ? `${parseInt(this.eosQuantity).toFixed(4)} ${this.EOS_TOKEN}`
          : `${parseInt(this.eosDacQuantity.replace(",", "")).toFixed(4)} ${process.env.DAC_TOKEN}`;
      const tokenToPay = process.env[`${payTokenSymbol}_TOKEN_CONTRACT`];
      const tariffName = `${this.header}.${payTokenSymbol.toLowerCase()}`;

      this.$store.dispatch("ual/prepareDacTransact", { stepsData, tokenToPay, payTokenQuantity, tariffName });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 490px;
  width: 190px;
  border-radius: 4px;
  font-weight: 700;
  color: #ebdff9;
}
.first-card {
  margin-right: 50px;
}
.second-card {
  background-color: #3d2b57;
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.36px;
  line-height: 19px;
  text-transform: uppercase;
}
.eos-quantity {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  font-size: 56px;
  line-height: normal;
}
.eos-quantity span {
  margin-top: -8px;
  font-size: 16px;
}
.or {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.36px;
  line-height: 19px;
  color: #b999db;
}
.eosdac-quantity {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 32px;
  line-height: normal;
}
.eosdac-quantity span {
  margin-top: 2px;
  font-size: 16px;
  letter-spacing: 0.36px;
}
.time-info {
  margin-top: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.29px;
  line-height: 15px;
  color: #ffffff;
}
.hint {
  position: relative;
  max-width: 100px;
  margin-top: 15px;
  color: #ffffff;
  font-size: 12px;
  font-style: italic;
  line-height: 14px;
  text-align: center;
}
.question {
  position: absolute;
  right: -22px;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #b999db;
  font-size: 12px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: 0.29px;
  line-height: 14px;
  color: #ffffff;
  transform: translateY(-50%);
}
.card-footer {
  display: flex;
  align-items: center;
  height: 104px;
  margin-top: auto;
}
.card-footer button {
  margin: 0;
}
.choose-token-wrapper > :first-child {
  margin-right: 10px;
}
@media (max-width: 479px) {
  .first-card {
    margin: 0;
  }
  .second-card {
    margin-top: 30px;
  }
}
</style>
