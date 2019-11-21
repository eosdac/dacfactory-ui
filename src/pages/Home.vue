<template>
  <q-page class="bg-accent full-height">
    <div class="bg-primary">
      <div class="q-pa-md">
        <div class="text-center">
          <div class="text-h6">{{ $t("home.welcome_to") }}</div>
          <div class="text-weight-bold text-h1" style="text-shadow: 1px 1px 3px #fff;">{{ $t("home.dac") }}</div>
          <div class="text-h5" style="letter-spacing: 3px;">• {{ $t("home.factory") }} •</div>
          <div class="row justify-center text-body1 q-mt-xl">
            <div style="max-width:500px">{{ $t("home.line1") }}</div>
          </div>
          <div class="text-body1 q-mt-xl">{{ $t("home.line2") }}</div>
          <div class="row justify-center q-mt-sm">
            <q-btn
              color="secondary"
              :label="$t('home.create_my_dac')"
              style="width:180px"
              class="q-py-sm"
              :to="createMyDacCurrentURL"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="diagonal"></div>
    <div class="row justify-center overflow-hidden" style="margin-top:-160px;">
      <transition appear enter-active-class="animated fadeInUp">
        <div class="bottom-info-box q-mb-md q-pa-md text-center">
          <div class="text-weight-bold">{{ $t("home.help_why") }}</div>
          <div class="text-body2 text-weight-light q-mt-sm">{{ $t("home.help_line1") }}</div>
          <div class="q-mt-sm">
            <q-icon
              name="ion-logo-youtube"
              @click="showYouTubeVideo = true"
              color="secondary"
              size="42px"
              class="cursor-pointer hover-rotate"
            />
            <div class="text-secondary q-caption">{{ $t("home.help_learn_more") }}</div>
          </div>
        </div>
      </transition>
    </div>
    <q-dialog v-model="showYouTubeVideo" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="text-white" style="width: 700px; max-width: 80vw;">
        <q-bar class="bg-secondary">
          <div>{{ $t("general.info") }}</div>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            @click="
              showYouTubeVideo = false;
              video_is_loaded = false;
            "
          >
            <q-tooltip content-class="bg-secondary ">{{ $t("general.close") }}</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="q-video" style="max-width:700px;max-height:350px;height: 56.25vw;">
            <div v-if="!video_is_loaded" class="position-relative fit row items-center justify-center">
              <q-spinner size="50px" color="primary" />
            </div>
            <iframe
              v-show="video_is_loaded"
              src="https://www.youtube.com/embed/PbQpAJOP6iA"
              @load="video_is_loaded = true"
              allowfullscreen
              style="border:0"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      showYouTubeVideo: false,
      video_is_loaded: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveStep: "factory/getActiveStep"
    }),
    createMyDacCurrentURL() {
      return `/create/step${this.getActiveStep || 1}`
    }
  }
};
</script>

<style>
.diagonal {
  height: 400px;
  background-image: url("../statics/images/diagonal.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -30px;
}
.bottom-info-box {
  width: 304px;
  height: 177px;
  border: 1px solid var(--q-color-secondary);
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
