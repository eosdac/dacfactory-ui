<template>
  <q-page padding class="bg-accent">
    <input-accountname v-model="text" color="secondary" label="Treasury Account" iconLeft="ion-person" />
    {{text}}
  </q-page>
</template>

<script>
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
  }
}
</script>

<style>
</style>
