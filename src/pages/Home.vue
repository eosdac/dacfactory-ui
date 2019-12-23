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
          <div class="column items-center buttons-wrapper">
            <div class="continue-reset-button">
              <q-btn
                color="secondary"
                :label="getActiveStep ? $t('home.continue_creation') : $t('home.create_my_dac')"
                style="width:180px"
                class="q-py-sm"
                :to="createMyDacCurrentURL"
              />
              <reset-confirm-dialog v-if="getActiveStep" />
            </div>
            <span class="text-body1">or</span>
            <div class="upload-json-wrapper">
              <q-btn
                icon="insert_drive_file"
                :class="['q-py-sm', 'upload-json-button', { 'upload-json-button-error': customFileError }]"
                :label="customFileError ? customFileError : $t('home.upload_dac_json')"
                @click="chooseFile"
              />
              <input
                type="file"
                id="file-input-id"
                class="visually-hidden"
                accept="application/json"
                ref="file_input"
                @change="uploadFile"
              />
            </div>
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
              videoIsLoaded = false;
            "
          >
            <q-tooltip content-class="bg-secondary ">{{ $t("general.close") }}</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="q-video" style="max-width:700px;max-height:350px;height: 56.25vw;">
            <div v-if="!videoIsLoaded" class="position-relative fit row items-center justify-center">
              <q-spinner size="50px" color="primary" />
            </div>
            <iframe
              v-show="videoIsLoaded"
              src="https://www.youtube.com/embed/PbQpAJOP6iA"
              @load="videoIsLoaded = true"
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

import ResetConfirmDialog from "components/home/ResetConfirmDialog";

export default {
  data() {
    return {
      showYouTubeVideo: false,
      videoIsLoaded: false,
      customFileError: null
    };
  },
  components: {
    ResetConfirmDialog
  },
  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep"
    }),
    createMyDacCurrentURL() {
      return `/create/step${this.getActiveStep || 1}`;
    }
  },
  methods: {
    chooseFile() {
      this.$refs.file_input.click();
    },
    uploadFile(e) {
      const file = e.target && e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            this.$store.commit("factory/setCustomDacData", JSON.parse(reader.result));
            this.$router.push("/create/step5");
          } catch (error) {
            this.customFileError = this.$t('home.error_in_json');
            this.resetUploadFileError()
          }
        };
        reader.onerror = () => {
          this.customFileError = this.$t('home.file_is_damaged');
          this.resetUploadFileError()
        };
        reader.readAsText(file);
      }
    },
    resetUploadFileError() {
      setTimeout(() => {
        this.customFileError = null;
        this.$refs.file_input.value = ''
      }, 3000)
    }
  }
};
</script>

<style lang="stylus">
.bottom-info-box
  width 304px
  height 177px
  border 1px solid $secondary
  border-radius 8px
  box-sizing border-box
  @media (max-width 479px)
    width 284px
.buttons-wrapper
  & > *
    margin-top 8px
.continue-reset-button
  display flex
.upload-json-wrapper
  position relative
.upload-json-button
  background-color #11b55b
.upload-json-button-error
  background-color $negative
  animation shake 0.36s
  pointer-events none
</style>
