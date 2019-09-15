<template>
  <div>
    
    <my-input
      type="number"
      :value="maxSupply"
      @input="maxSupply = $event.toLowerCase()"
      color="secondary"
      label="Max Supply"
      hint="helper text"
      :rules="[
        val =>  !!val|| '* Required',
      ]"
      :counter="false"
      @statusChange="$store.commit('factory/setStepsData',{step:3, key:'maxSupply', data: $event})"
    />

    <div class="q-mt-md">
  
      <div class="row justify-between text-subtitle1">
        <div>Decimals: {{ decimals }}</div>
        <div class="text-secondary text-weight-bold">{{ parseDecimals }}</div>
      </div>
    
      <q-slider
        dark
        :value="decimals"
        @input="decimals = $event; $store.commit('factory/setStepsData',{step:3, key:'decimals', data: {value:$event}})"
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
      decimals: this.$store.state.factory.stepsData[3].decimals
    }
  },
  computed:{
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

  }
}
</script>

<style>
.q-slider--dark .q-slider__track-markers{
  color:var(--q-color-accent) !important;
}
</style>
