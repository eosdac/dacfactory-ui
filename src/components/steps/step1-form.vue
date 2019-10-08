<template>
  <div class="overflow-hidden">
    
    <my-input
      :value="dacName"
      @input="dacName = $event.trim()"
      color="secondary"
      :label="$t('step1.dac_name')"
      :counter="false"
      :hint="$t('step1.dac_name_hint')"
      :rules="[
        val =>  !!val|| $t('general.required'),
        val => val.length >= 3 || $t('step1.dac_name_rule_length_3'),
      ]"
      @statusChange="$store.commit('steps/setStepsData',{step:1, key:'dacName', data: $event})"
    />



    <my-input
      :value="tokenSymbol"
      @input="tokenSymbol = $event.trim().toUpperCase()"
      color="secondary"
      :label="$t('step1.token_symbol')"
      :hint="$t('step1.token_symbol_hint')"
      :counter="false"
      maxlength="7"
      :rules="[
        val =>  !!val || $t('general.required'),
        isValidSymbol,
        val => val.length >= 3 || $t('step1.symbol_rule_length_3'),
        val => val.length <= 7 || $t('step1.symbol_rule_length_7'),
        isAvailableSymbol
      ]"
      @statusChange="$store.commit('steps/setStepsData',{step:1, key:'tokenSymbol', data: $event})"
    />

    <q-input
      type="textarea"
      outlined
      dark
      :value="dacDescription"
      @input="dacDescription = $event; $store.commit('steps/setStepsData',{step:1, key:'dacDescription', data: {value:$event}})"
      maxlength="250"
      counter
      color="secondary"
      :label="$t('step1.description')"
      :hint="$t('step1.description_hint')"
      class="q-mb-md overflow-hidden"
    >
      <template  v-slot:append class="overflow-hidden">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" mode="out-in">
          <q-icon v-if="dacDescription" name="check" color="positive" key="ok" />
        </transition>
      </template>
    </q-input>

    <my-input
      type="text"
      :value="websiteUrl"
      @input="websiteUrl = $event.trim()"
      color="secondary"
      :label="$t('step1.website_url')"
      :hint="$t('step1.website_url_hint')"
      :counter="false"
      :rules="[
        isValidUrl
      ]"
      @statusChange="$store.commit('steps/setStepsData',{step:1, key:'websiteUrl', data: $event})"
    />

    <my-input
      :value="dacId"
      @input="dacId = $event.toLowerCase()"
      color="secondary"
      :label="$t('step1.dac_id')"
      :hint="$t('step1.dac_id_hint')"
      :counter="false"
      maxlength="11"
      :rules="[
        val => !!val || $t('general.required'),
        isValidDacId,
        val => val.length >= 5 || $t('step1.dac_id_rule_length_5'),
        val => val.length <= 11 || $t('step1.dac_id_rule_length_11'),
        isAvailableDacId
      ]"
      @statusChange="$store.commit('steps/setStepsData',{step:1, key:'dacId', data: $event})"
    />

  
  </div>
</template>

<script>
import myInput from 'components/form/my-input';
import {
  isValidSymbol,
  isAvailableDacId,
  isValidDacId,
  isValidUrl,
  isAvailableSymbol
} from "../../imports/validators";
export default {
  // name: 'ComponentName',
  components:{
    myInput
  },
  data () {
    return {
      dacName: this.$store.state.factory.stepsData[1].dacName,
      tokenSymbol: this.$store.state.factory.stepsData[1].tokenSymbol,
      dacId: this.$store.state.factory.stepsData[1].dacId,
      dacDescription: this.$store.state.factory.stepsData[1].dacDescription,
      websiteUrl: this.$store.state.factory.stepsData[1].websiteUrl

    }
  },
  methods:{
    isValidSymbol,
    isValidDacId,
    isAvailableDacId,
    isValidUrl,
    isAvailableSymbol
  }

}
</script>

<style>
</style>
