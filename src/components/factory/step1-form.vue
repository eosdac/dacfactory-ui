<template>
  <div>
    
    <my-input
      :value="dacName"
      @input="dacName = $event.trim()"
      color="secondary"
      label="DAC Name"
      :counter="false"
      hint="Enter a name for your DAC"
      :rules="[
        val =>  !!val|| '* Required',
        val => val.length >= 3 || 'DAC name must be minimum 3 chars.',
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'dacName', data: $event})"
    />



    <my-input
      :value="tokenSymbol"
      @input="tokenSymbol = $event.trim().toUpperCase()"
      color="secondary"
      label="Token Symbol"
      hint="Min 3/ Max 7 chars"
      :counter="false"
      maxlength="7"
      :rules="[
        val =>  !!val|| '* Required',
        isValidSymbol,
        val => val.length >= 3 || 'Symbol must have a minimum of 3 chars.',
        val => val.length <= 7 || 'Symbol can\'t have more then 7 chars',
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'tokenSymbol', data: $event})"
    />

    <q-input
      type="textarea"
      :resize="false"
      outlined
      dark
      :value="dacDescription"
      @input="dacDescription = $event; $store.commit('factory/setStepsData',{step:1, key:'dacDescription', data: {value:$event}})"
      maxlength="250"
      counter
      color="secondary"
      label="Description"
      hint="Optional info about your DAC"
      class="q-mb-md"
    >
      <template  v-slot:append >
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
      label="Website URL"
      hint="Optional link to your website"
      :counter="false"
      :rules="[
        isValidUrl
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'websiteUrl', data: $event})"
    />

    <my-input
      :value="dacId"
      @input="dacId = $event.toLowerCase()"
      color="secondary"
      label="DAC ID"
      hint="Min 5/ Max 11 chars"
      :counter="false"
      maxlength="11"
      :rules="[
        val => !!val || '* Required',
        isValidDacId,
        val => val.length >= 5 || 'DAC ID must have a minimum of 5 chars.',
        val => val.length <= 11 || 'DAC ID can\'t have more then 11 chars',
        isAvailableDacId
      ]"
      @statusChange="$store.commit('factory/setStepsData',{step:1, key:'dacId', data: $event})"
    />

  
  </div>
</template>

<script>
import myInput from 'components/form/my-input';
import {
  isValidSymbol,
  isAvailableDacId,
  isValidDacId,
  isValidUrl
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
    isValidUrl
  }

}
</script>

<style>
</style>
