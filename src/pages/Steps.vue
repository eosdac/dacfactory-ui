<template>
  <q-page class="bg-accent column">
    <div class="wrapper" :key="`i${getActiveStep}`">
      <div style="flex:1" class="bg-accent">
        <div
          class="row justify-end q-pl-md q-pt-xl q-pb-xl overflow-hidden"
          :class="$q.screen.gt.md ? 'q-pr-xxl' : 'q-pr-md'"
        >
          <div :class="getActiveStep !== 5 ? ['col-xs-12', 'col-lg-6'] : 'width-xl-screen'">
            <div class="text-h6 text-weight-thin">
              {{ $t("general.step_of", { active_step: getActiveStep, max_steps: stepsNumber }) }}
            </div>
            <h1 class="text-h5 q-mb-lg">{{ $t("step" + getActiveStep + ".title") }}</h1>
            <div class="form-wrapper">
              <p class="info-text" v-if="getActiveStep < 5">* {{ $t("general.info_will_be_saved") }} *</p>
              <transition
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOut"
                mode="out-in"
                appear
              >
                <step1-form v-if="getActiveStep === 1" key="form-page-1" />
                <step2-form v-else-if="getActiveStep === 2" key="form-page-2" />
                <step3-form v-else-if="getActiveStep === 3" key="form-page-3" />
                <step4-form v-else-if="getActiveStep === 4" key="form-page-4" />
                <step5-form v-else-if="getActiveStep === 5" key="form-page-5" />
              </transition>
              <transition
                appear
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOut"
                mode="out-in"
              >
                <div class="continue-btn-wrapper">
                  <q-btn
                    v-if="getActiveStep < stepsNumber"
                    color="secondary"
                    class="full-width"
                    @click="onContinueButtonClick"
                    :disable="!!checkStepErrors"
                    :key="`continue${getActiveStep}`"
                    >{{ $t("general.continue") }}</q-btn
                  >
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-right bg-primary">
        <div class="q-pa-md">
          <div v-if="getActiveStep === 1">
            <step1-right />
          </div>
          <div v-if="getActiveStep === 2">
            <step2-right />
          </div>
          <div v-if="getActiveStep === 3">
            <step3-right />
          </div>
          <div v-if="getActiveStep === 4">
            <step4-right />
          </div>
          <div v-if="getActiveStep === 5">
            <step5-right />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { findStepErrors } from "imports/utils";

import { STEPS_NUMBER } from "components/constants";

import { Step1Form, Step1Right } from "components/steps/Step1";
import { Step2Form, Step2Right } from "components/steps/Step2";
import { Step3Form, Step3Right } from "components/steps/Step3";
import { Step4Form, Step4Right } from "components/steps/Step4";
import { Step5Form, Step5Right } from "components/steps/Step5";

export default {
  data() {
    return {
      stepsNumber: STEPS_NUMBER
    };
  },
  created() {
    const stepNumber = Number(this.$route.params.step.replace("step", ""));
    const { stepsData, customDacData } = this.$store.state.factory;
    const stepFromStore = stepsData.activeStep;

    switch (true) {
      case stepFromStore === 0:
        this.$store.commit("factory/setActiveStep", 1);
        break;
      case stepNumber < stepFromStore:
        this.$store.commit("factory/setActiveStep", stepNumber);
        break;
      case stepNumber > stepFromStore:
        if (!customDacData) {
          this.$router.push(`/create/step${stepFromStore}`);
        }
        break;
      default:
    }
  },
  components: {
    Step1Form,
    Step1Right,
    Step2Form,
    Step2Right,
    Step3Form,
    Step3Right,
    Step4Form,
    Step4Right,
    Step5Form,
    Step5Right
  },
  computed: {
    getActiveStep() {
      return this.$store.state.factory.customDacData ? 5 : this.$store.getters["factory/getActiveStep"];
    },
    checkStepErrors() {
      return findStepErrors(this.$store.state.factory.stepsData[this.getActiveStep]);
    }
  },
  methods: {
    onContinueButtonClick() {
      this.$router.push(`/create/step${this.getActiveStep + 1}`);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.checkStepErrors && to.params.step > from.params.step) {
      next(false);
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/dac-creation" || !this.$store.state.factory.customDacData) {
      next();
    } else {
      this.$store.commit("factory/setCustomDacData", null);
      next();
    }
  }
};
</script>

<style scoped lang="stylus">
h1
  margin-top 0
.wrapper
  display flex
  flex-grow 1
  @media (max-width 899px)
    flex-direction column
.wrapper-right
  flex 1
.continue-btn-wrapper
  margin-top 24px
.info-text
  padding 0 10px
  margin-bottom 24px
  font-size 14px
  text-align center
  color $warning
.form-wrapper
  @media (max-width 899px)
    max-width 430px
    margin 0 auto
@media (max-width 1439px)
  .width-xl-screen
    height auto
    width 100%
</style>
