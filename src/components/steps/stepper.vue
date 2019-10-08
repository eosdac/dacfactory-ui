<template>
  <div>
    <q-linear-progress dark :value="getProgressValue" size="5px" color="secondary" />
    <div class="row  items-center relative-position">
      <div class="col-4 row justify-start q-pl-md q-pb-md overflow-hidden">
        <transition
          appear
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutLeft"
          mode="out-in"
        >
          <q-btn v-if="shouldDisplayPrevStepBtn" color="secondary" class="q-mt-sm" @click="prevStep">
            <q-icon name="ion-arrow-back" />
            <div v-if="$q.screen.gt.xs" class="on-right text-weight-light">{{ $t("general.go_back") }}</div>
          </q-btn>
          <q-btn v-if="!shouldDisplayPrevStepBtn && $route.path !== '/'" key="home" flat class="q-mt-sm" to="/">
            <q-icon name="home" style="color:#54565c" />
          </q-btn>
        </transition>
      </div>

      <div class="col-4 row justify-center items-center  overflow-hidden ">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
          mode="out-in"
        >
          <div
            v-if="getActiveStep > 0"
            class="text-center cursor-pointer fit"
            :key="`${getActiveStep}`"
            @click="showstepsmenu = true"
          >
            {{ $t("step" + getActiveStep + ".title") }}
          </div>
          <div v-else class="text-h5">{{ $t("general.welcome") }}</div>
        </transition>
      </div>

      <div class="col-4 row justify-end q-pr-md q-pb-md overflow-hidden">
        <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
          <q-btn color="secondary" class="q-mt-sm" @click="nextStep" v-if="shouldDisplayNextStepBtn">
            <div v-if="$q.screen.gt.xs" class="on-left text-weight-light">
              {{ $t("general.go_to_step", { step: getActiveStep + 1 }) }}
            </div>
            <q-icon name="ion-arrow-forward" />
          </q-btn>
        </transition>
      </div>
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

import { STEPS_NUMBER } from "components/constants/common";


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
    shouldDisplayPrevStepBtn: function() {
      return this.getActiveStep && this.getActiveStep > 1;
    },
    shouldDisplayNextStepBtn: function() {
      return this.getActiveStep < STEPS_NUMBER;
    },
    getProgressValue: function() {
      return this.getActiveStep >= 1 ? this.getActiveStep / STEPS_NUMBER : 0;
    }
  },
  methods: {
    nextStep() {
      // this.$store.commit('factory/setActiveStep', this.getActiveStep+1);
      const next = this.getActiveStep + 1;
      if (next <= STEPS_NUMBER) {
        this.$router.push(`/create/step${next}`);
      }
    },
    prevStep() {
      // this.$store.commit('factory/setActiveStep', this.getActiveStep-1);
      let prev = this.getActiveStep - 1;
      if (prev >= 1) {
        this.$router.push(`/create/step${prev}`);
      }
    }
  },
  watch: {
    $route: {
      handler: function(r) {
        // console.log('route change:', r);
        if (!r.path.startsWith("/create/")) {
          this.$store.commit("factory/setActiveStep", 0);
          return;
        }
        let step = this.$route.params.step;
        if (step && step.includes("step")) {
          let stepNumber = Number(step.replace("step", ""));
          if (stepNumber && stepNumber <= STEPS_NUMBER && stepNumber > 0) {
            this.$store.commit("factory/setActiveStep", stepNumber);
          } else {
            this.$store.commit("factory/setActiveStep", 0);
            this.$router.push("/");
          }
        } else {
          this.$store.commit("factory/setActiveStep", 0);
          this.$router.push("/");
        }
      },
      immediate: true
    }
  }
};
</script>

<style>
.q-router-link--active.q-link {
  color: white;
  background-color: #54565c;
}
</style>
