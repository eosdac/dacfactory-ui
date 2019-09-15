<template>
  <div>
    
    <my-input
     
      :value="authorityAccount"
      @input="authorityAccount = $event.toLowerCase()"
      color="secondary"
      label="Authority Account"
      hint="Account name must be 12 characters"
      counter
      maxlength="12"
      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Accountname must be 12 characters',
        isAvailableAccountName
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'authorityAccount', data: $event})"
    />
    <my-input
    
      :value="treasuryAccount"
      @input="treasuryAccount = $event.toLowerCase()"
      color="secondary"
      label="Treasury Account"
      hint="Account name must be 12 characters"
      counter
      maxlength="12"
      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Accountname must be 12 characters',
        isAvailableAccountName
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'treasuryAccount', data: $event})"
    />
  
  </div>
</template>

<script>
import myInput from 'components/form/my-input';
import {
  isValidAccountName,
  isAvailableAccountName
} from "../../imports/validators";
export default {
  // name: 'ComponentName',
  components:{
    myInput
  },
  data () {
    return {
      authorityAccount: this.$store.state.factory.stepsData[1].authorityAccount,
      treasuryAccount: this.$store.state.factory.stepsData[1].treasuryAccount
    }
  },
  methods:{
    isValidAccountName,
    isAvailableAccountName
  }
}
</script>

<style>
</style>
