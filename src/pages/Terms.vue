<template>
  <q-page class="bg-accent">
    <div class="q-pa-xl">
      <q-markdown v-if="terms" :src="terms" :no-container="true"></q-markdown>
      <div v-else>Loading...</div>
    </div>

  </q-page>
</template>

<script>
  import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
  const { EULA_PRE } = process.env;

  export default {
    data() {
      return {
        terms: null
      };
    },
    components: {
      QMarkdown
    },
    async mounted() {
      console.log(process.env);
      const res = await this.$axios.get(EULA_PRE);
      this.terms = res.data;
    }
  };
</script>

<style scoped></style>
