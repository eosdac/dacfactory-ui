<template>
  <div v-if="!customDacData">
    <q-linear-progress dark :value="getProgressValue" class="linear-progress" />
    <div class="wrapper">
      <transition
        appear
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
      >
        <div class="prev-btn-wrapper">
          <q-btn v-if="shouldDisplayPrevStepBtn" color="secondary" @click="prevStep">
            <q-icon name="ion-arrow-back" />
            <div v-if="$q.screen.gt.xs" class="on-right text-weight-light">{{ $t("general.go_back") }}</div>
          </q-btn>
          <q-btn v-if="shouldDisplayHomeButton" key="home" flat to="/">
            <q-icon name="home" style="color:#54565c" />
          </q-btn>
        </div>
      </transition>
      <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" mode="out-in">
        <q-btn flat v-if="getActiveStep > 0" class="center-btn" :key="`${getActiveStep}`" @click="showstepsmenu = true">
          <span class="center-btn-text">{{ $t("step" + getActiveStep + ".title") }}</span>
          <q-icon name="arrow_drop_up" :class="{ 'opened-menu-arrow': showstepsmenu }" />
        </q-btn>
        <div v-else class="text-h5">{{ $t("general.welcome") }}</div>
      </transition>
      <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <div class="next-btn-wrapper">
          <q-btn color="secondary" :disable="!!checkStepErrors" @click="nextStep" v-if="shouldDisplayNextStepBtn">
            <div v-if="$q.screen.gt.xs" class="on-left text-weight-light">
              {{ $t("general.go_to_step", { step: nextButtonNumber }) }}
            </div>
            <q-icon name="ion-arrow-forward" />
          </q-btn>
        </div>
      </transition>
    </div>
    <q-dialog v-model="showstepsmenu" position="bottom">
      <q-list dark bordered class="bg-accent">
        <div class="menu-link-wrapper" v-for="i in stepsNumber">
          <q-item clickable v-ripple :to="`/create/step${i}`" :key="`step${i}`" :tabindex="getActiveStep < i ? -1 : 0">
            <q-item-section side>
              <q-item-label caption class="menu-step-text">{{ $t("general.step") }} {{ i }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t("step" + i + ".title") }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="disable-holder" v-if="paramMenuLinkDisable < i"></div>
        </div>
        <q-item clickable v-ripple to="/" exact tabindex="0">
          <q-item-section side>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t("general.go_home") }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { findStepErrors } from "imports/utils";

import { STEPS_NUMBER } from "components/constants";

export default {
  data() {
    return {
      showstepsmenu: false,
      stepsNumber: STEPS_NUMBER
    };
  },
  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep"
    }),
    isStepPage() {
      return this.$route.path.startsWith("/create/");
    },
    paramMenuLinkDisable() {
      let param = 0;
      if (!this.checkStepErrors && this.isStepPage) {
        param = 1;
      }
      return this.getActiveStep + param;
    },
    shouldDisplayPrevStepBtn: function() {
      return this.isStepPage && this.getActiveStep > 1;
    },
    shouldDisplayNextStepBtn: function() {
      if (!this.isStepPage) {
        return true;
      } else {
        return this.getActiveStep < STEPS_NUMBER;
      }
    },
    nextButtonNumber() {
      const activeStep = this.getActiveStep;
      return this.isStepPage || !activeStep ? activeStep + 1 : activeStep;
    },
    shouldDisplayHomeButton: function() {
      return this.isStepPage && this.getActiveStep === 1;
    },
    getProgressValue: function() {
      return this.getActiveStep >= 1 ? this.getActiveStep / STEPS_NUMBER : 0;
    },
    checkStepErrors() {
      if (!this.isStepPage) {
        return false;
      }

      return findStepErrors(this.$store.state.factory.stepsData[this.getActiveStep]);
    },
    customDacData() {
      return this.$store.state.factory.customDacData
    }
  },
  methods: {
    nextStep() {
      const next = this.nextButtonNumber;
      if (next <= STEPS_NUMBER) {
        this.$router.push(`/create/step${next}`);
      }
    },
    prevStep() {
      let prev = this.getActiveStep - 1;
      if (prev >= 1) {
        this.$router.push(`/create/step${prev}`);
      }
    }
  },
  watch: {
    $route(r) {
      if (!r.path.startsWith("/create/")) {
        return;
      }
      const stepNumber = Number(r.params.step.replace("step", ""));

      if (stepNumber <= STEPS_NUMBER && stepNumber > 0) {
        if (!this.customDacData) {
          this.$store.commit("factory/setActiveStep", stepNumber);
        }
      } else {
        this.$store.commit("factory/setActiveStep", 0);
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  justify-content space-between
  align-items center
  height 52px
.linear-progress
  height 5px
  color $secondary
.next-btn-wrapper
  display flex
  justify-content flex-end
  width 56px
  margin-right 12px
  @media (min-width 600px)
    width 160px
.prev-btn-wrapper
  margin-left 12px
  @media (min-width 600px)
    width 160px
.center-btn
  padding 4px 10px
  text-transform capitalize
.center-btn-text
  @media (max-width 399px)
    display none
.opened-menu-arrow
    transition transform 0.28s
    transform rotate(180deg)
.menu-link-wrapper
  position relative
.menu-link-wrapper:not(:last-child)
  border-bottom 1px solid rgba(255,255,255,0.48)
.menu-step-text
  color #ffffff
</style>
