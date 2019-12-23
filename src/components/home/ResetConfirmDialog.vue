<template>
  <div class="wrapper">
    <q-dialog v-model="isOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <p class="dialog-title">{{ $t("home.all_data_will_be_deleted") }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('general.cancel')" color="primary" v-close-popup />
          <q-btn flat :label="$t('home.reset_dac_data')" color="primary" v-close-popup @click="resetData" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn
      :title="$t('home.reset_dac_data')"
      color="secondary"
      icon="restore_page"
      class="q-py-sm"
      @click="toggleOpen"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { isOpen: false };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    resetData() {
      this.$store.commit("factory/resetFactoryState");
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper
  margin-left 10px
.dialog-title
  margin 0
  font-size 22px
  font-weight 500
</style>
