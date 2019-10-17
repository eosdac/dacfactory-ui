<template>
  <section :class="['card', hint ? 'first-card' : 'second-card']">
    <div class="card-header">{{ header }}</div>
    <p class="eos-quantity">{{ eosQuantity }}<span>EOS</span></p>
    <p class="or">or</p>
    <p class="eosdac-quantity">{{ eosDacQuantity }}<span>EOSDAC</span></p>
    <p class="time-info">{{ timeInfo }}</p>
    <p class="hint" v-if="hint">{{ hint }}<span class="question">?</span></p>
    <div class="card-footer">
      <q-btn label="send trx" @click="transfer" color="secondary" class="q-mt-md" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
      require: true
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    async transfer() {
      const stepsData = this.$store.state.factory.stepsData;
      const { dacName, dacId, dacDescription, tokenSymbol/*, websiteUrl*/ } = stepsData[1];
      const { maxSupply, decimals, issuance } = stepsData[2];
      const {
        custodianName,
        requestPay,
        lockup,
        lockupSelect,
        periodLength,
        numberElected,
        thresholdHigh,
        thresholdMed,
        thresholdLow,
        maxVotes,
        voteQuorumPercent
      } = stepsData[3];
      const { /*websiteURL,*/ logoURL, logoMarkURL, color } = stepsData[4];
      const actions = [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: this.getAccountName,
            to: "piecesnbitss",
            quantity: "1.0000 EOS",
            memo: "",
            id: dacId,
            owner: "evilmikehere",
            appointed_custodian: "evilmikehere",
            authority: "15mxtwtuauth",
            treasury: "15mxtwtufund",
            symbol: { contract: "kasdactokens", symbol: `${decimals},${tokenSymbol}` },
            max_supply: `${maxSupply.toFixed(4)} ${tokenSymbol}`,
            issuance: `${issuance.toFixed(4)} ${tokenSymbol}`,
            name: dacName,
            description: dacDescription,
            homepage: "https://mydac.eosdac.io",
            logo_url: "https://image.flaticon.com/icons/svg/1466/1466124.svg",
            logo_notext_url: "https://image.flaticon.com/icons/svg/1466/1466085.svg",
            background_url: "",
            theme: {
              is_dark: true,
              colors: {
                $warning: "#f2e285",
                primary: "#ba5f34",
                bg1: "#1f130d",
                bg2: "#574943",
                text1: "rgba(255,255,255,0.9)",
                text2: "rgba(255,255,255,0.7)",
                info: "#4583ba",
                positive: "#21ba45",
                negative: "#db2828",
                dark: "#3d2d27"
              }
            },
            custodian_config: {
              lockupasset: { quantity: `10.0000 ${tokenSymbol}`, contract: "kasdactokens" },
              maxvotes: 5,
              numelected: 5,
              periodlength: 604800,
              should_pay_via_service_provider: false,
              initial_vote_quorum_percent: 1,
              vote_quorum_percent: 1,
              auth_threshold_high: 4,
              auth_threshold_mid: 3,
              auth_threshold_low: 3,
              lockup_release_time_delay: 3600,
              requested_pay_max: { quantity: "1.0000 EOS", contract: "eosio.token" }
            },
            proposals_config: {
              proposal_threshold: 4,
              finalize_threshold: 1,
              escrow_expiry: 2592000,
              approval_expiry: 2592000
            }
          }
        }
      ];
      this.$store.dispatch("ual/transact", { actions });
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
  font-size: 16px;
  letter-spacing: 0.36px;
  line-height: 19px;
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
@media (max-width: 461px) {
  .first-card {
    margin: 0;
  }
  .second-card {
    margin-top: 30px;
  }
}
</style>
