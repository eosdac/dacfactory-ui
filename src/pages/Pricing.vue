<template>
  <q-page class="bg-primary full-height content-page">
    <div>
      <div class="q-pa-md">
        <div class="text-h1">{{$t('pricing.title')}}</div>
        <p v-html="$t('pricing.line1')"></p>
        <p v-html="$t('pricing.line2')"></p>
        <p v-html="$t('pricing.line3')"></p>
      </div>
    </div>
      <div>
        <div class="table-wrapper">
          <div class="table">
            <p class="info-text text1">{{ $t("step5.creation_of_account") }}</p>
            <p class="info-text max-width-300 text2">
              {{ $t("step5.once_you") }}
            </p>
          </div>
          <purchase-cards :isAgree="isAgree" :onCheckboxError="onCheckboxError" :checkboxRef="checkboxRef" :payButtons="false" />

        </div>
      </div>
  </q-page>
</template>

<script>
  import { mapGetters } from "vuex";

  import PurchaseCards from "components/steps/Step5/PurchaseCards";

  export default {
    data() {
      return {
        showYouTubeVideo: false,
        videoIsLoaded: false,
        customFileError: null
      };
    },
    components: {
      PurchaseCards
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

<style scoped lang="stylus">
  p
    margin 0
  .info-text
    font-size 16px
    letter-spacing 0.36px
    line-height 22px
    color $light-violet
  .table-wrapper
    position relative
    width 914px
    height 490px
    margin 30px 0 0 40px
    padding-top 76px
    @media (max-width 1439px)
      width fit-content
      height auto
      margin 30px auto 0 auto
      padding-top 0
  .table
    position relative
    z-index 1
    padding 38px 55px
    border 1px solid $secondary
    border-radius 4px
    color $light-violet
    @media (max-width 1439px)
      padding 8px 45px
    @media (max-width 479px)
      padding 18px 35px
  .italic-text
    margin 0
    font-size 12px
    font-style italic
    line-height 17px
    color #ffffff
  .checkbox-wrapper
    display flex
    align-items center
    margin 32px 0 0 45px
    & > span
      margin-left 5px
      transition color 0.2s
      &.checkbox-error
        color $negative
      &.checkbox-normal
        color $light-violet
  .terms-link
    color $light-violet
    transition color 0.2s
    &:hover,
    &:focus
      color $medium-violet
  .terms-link-error
    color $negative
    transition color 0.2s
    &:hover,
    &:focus
      color $negative
  .terms-conditions-anim
    animation shake 0.36s
  .text1
    margin 30px 0 0
  .text2
    margin 35px 0 45px
  .max-width-260
    max-width 260px
  .max-width-300
    max-width 300px
  .terms-wrapper
    margin: 0px 40px
  .wrapper
    position absolute
    right 60px
    top 0
    display flex
    @media (max-width 1439px)
      position static
      margin-top 30px
    @media (max-width 479px)
      flex-direction column
      align-items center
  .centered-wrapper
    justify-content center
    align-items center
    width 430px
    height 456px
    font-size 40px
    text-align center
    @media (max-width 479px)
      width: auto
      font-size 16px
  .loader
    font-size 80px
    animation rotate 1.5s infinite linear
    @media (max-width 479px)
      font-size 50px
  @keyframes rotate
    from
      transform scale(-1, 1) rotate(360deg)
    to
      transform scale(-1, 1) rotate(0)
</style>

