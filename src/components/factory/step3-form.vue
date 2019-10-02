<template>
  <div>
    <div class="text-subtitle text-grey-4 q-mb-sm">Lockup Asset & amount</div>
    <extended-asset />
    <div class="text-subtitle text-grey-4 q-mb-sm">Vote Thresholds</div>
    <vote-threshold />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import myInput from 'components/form/my-input';
import extendedAsset from 'components/form/extended-asset';
import voteThreshold from 'components/form/vote-threshold';
// import {
//   isValidAccountName,
//   isAvailableAccountName
// } from "../../imports/validators";
export default {
  // name: 'ComponentName',
  components:{
    myInput,
    voteThreshold,
    extendedAsset
  },
  data () {
    return {
      maxSupply: this.$store.state.factory.stepsData[3].maxSupply,
      decimals: Number(this.$store.state.factory.stepsData[3].decimals)
    }
  },
  computed:{
    
    ...mapGetters({
      getTokenSymbol: "factory/getTokenSymbol"
    }),
    parseDecimals(){
      let string = '';
      if(this.decimals){
        string += '.';
        for(let i = 0; i < this.decimals; i++){
          string +='0';
        }
      }
      return string;
    }
  },
  methods:{
    parseLocalizedSupply(v){
      if(v==''){
        return '';
      }
      // v= String(v).split(',').join('');
      return parseInt(v).toLocaleString();
    },
    handleSupplyInput(v){
      this.maxSupply = Math.round(v);
    }
  }
}
</script>

<style>
.q-slider--dark .q-slider__track-markers{
  color:var(--q-color-accent) !important;
}
</style>
