<template>
  <div>
    <q-linear-progress dark :value="getProgressValue" size="5px" color="secondary" />
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
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
          mode="out-in"
        >
          <q-btn icon="arrow_drop_up"
                 flat
            v-if="getActiveStep > 0"
            class="center-btn"
            :key="`${getActiveStep}`"
            @click="showstepsmenu = true"
          >
            {{ $t("step" + getActiveStep + ".title") }}
          </q-btn>
          <div v-else class="text-h5">{{ $t("general.welcome") }}</div>
        </transition>
        <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
          <div class="next-btn-wrapper">
            <div class="next-btn-relative-wrapper">
            <q-btn color="secondary" @click="nextStep" v-if="shouldDisplayNextStepBtn">
              <div v-if="$q.screen.gt.xs" class="on-left text-weight-light">
                {{
                  $t("general.go_to_step", {
                    step: nextButtonNumber
                  })
                }}
              </div>
              <q-icon name="ion-arrow-forward" />
            </q-btn>
            <div class="disable-holder" v-if="checkStepErrors" />
            </div>
          </div>
        </transition>
    </div>
    <q-dialog v-model="showstepsmenu" position="bottom">
      <q-list dark bordered separator class="bg-accent">
        <q-item v-for="i in stepsNumber" clickable v-ripple :to="`/create/step${i}`" :key="`step${i}`">
          <q-item-section side>
            <q-item-label caption>{{ $t("general.step") }} {{ i }}</q-item-label>
            <!-- <q-icon name="star" color="yellow" /> -->
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t("step" + i + ".title") }}</q-item-label>
            <!-- <q-item-label caption>Caption</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section side>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t("general.go_home") }}</q-item-label>
            <!-- <q-item-label caption>Caption</q-item-label> -->
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
        this.$store.commit("factory/setActiveStep", stepNumber);
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
  position relative
  display flex
  justify-content space-between
  align-items center
  height 52px
.next-btn-wrapper
  display flex
  justify-content flex-end
  margin-right 12px
  @media (min-width 600px)
    width 160px
.next-btn-relative-wrapper
  position relative
.prev-btn-wrapper
  margin-left 12px
  @media (min-width 600px)
    width 160px
.center-btn
  padding 4px 10px
  text-transform capitalize
</style>
