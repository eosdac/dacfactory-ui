<template>
  <div>
    
    <div class="row text-caption justify-end text-secondary text-weight-bold" style="height:20px">
      <span>{{parseLocalizedSupply(maxSupply)}}</span>
      <span class="q-ml-xs" v-if="parseLocalizedSupply(maxSupply)">{{getTokenSymbol}}</span>
    </div>
    <my-input
      type="number"
      :value="maxSupply"
      @input="handleSupplyInput"

      color="secondary"
      :label="$t('step3.max_supply', { token_symbol: getTokenSymbol })"
      :hint="$t('step3.max_supply_hint')"
      :rules="[
        val =>  !!val|| $t('general.required'),
        val =>  val > 0|| $t('step3.max_supply_rule_positive'),
      ]"
      :counter="false"
      @statusChange="$store.commit('factory/setStepsData',{step:3, key:'maxSupply', data: $event})"
      :debounce="0"
    />
  


    <div class="q-mt-xs">
  
      <div class="row justify-between text-subtitle1">
        <div class="text-grey-4">{{ $t('step3.decimals') }}: {{ decimals }}</div>
        <div class="text-secondary text-weight-bold">{{ parseDecimals }}</div>
      </div>
    
      <q-slider
        dark
        :value="decimals"
        @input="decimals = $event; $store.commit('factory/setStepsData',{step:3, key:'decimals', data: {value:Number($event)}})"
        markers
        label
        :min="0"
        :max="8"
        color="secondary"
        class="q-mt-md"
      />
    </div>
    
  </div>
</template>

<script>
import myInput from 'components/form/my-input';
import { mapGetters } from "vuex";
// import {
//   isValidAccountName,
//   isAvailableAccountName
// } from "../../imports/validators";
export default {
  // name: 'ComponentName',
  components:{
    myInput
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
      };
      // v= String(v).split(',').join('');
      return parseInt(v).toLocaleString();
    },
    handleSupplyInput(v){
      console.log(v)
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
