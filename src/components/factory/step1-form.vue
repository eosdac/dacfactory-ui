<template>
  <div>
    
    <my-input
     
      :value="authorityAccount"
      @input="authorityAccount = $event.toLowerCase()"
      color="secondary"
      label="Authority Account"

      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Accountname must be 12 characters',
        isAvailableAccountName
      ]"
      @statusChange="!$event.error?$store.commit('factory/setStepsData',{step:1, data:{authorityAccount: $event.value}}):''"
    />
    <my-input
    
      :value="treasuryAccount"
      @input="treasuryAccount = $event.toLowerCase()"
      color="secondary"
      label="Treasury Account"

      :rules="[
        val => !!val || '* Required',
        isValidAccountName,
        val => val.length == 12 || 'Accountname must be 12 characters',
        isAvailableAccountName
      ]"
      @statusChange="!$event.error?$store.commit('factory/setStepsData',{step:1, data:{treasuryAccount: $event.value}}):''"
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
