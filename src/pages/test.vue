<template>
  <q-page padding class="bg-accent">
    <input-accountname v-model="text" color="secondary" label="Treasury Account" :rules="[isValidAccountName, isAvailableAccountName]" />
    {{text}}
  </q-page>
</template>

<script>
import {isValidAccountName, isAvailableAccountName} from '../imports/validators';
import inputAccountname from 'components/form/input-accountname';

export default {
    // name: 'PageName',
  components:{
    inputAccountname
  },
  data() {
    return {
      text: ""
    };
  },
  methods:{
    isValidAccountName,
    isAvailableAccountName

  }
}
</script>

<style>
</style>
