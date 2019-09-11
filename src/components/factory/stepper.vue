<template>
  <div>
    <q-linear-progress dark :value="getProgressValue" color="secondary" />
    <!-- <div class="q-px-md q-pb-md row justify-between">
      
      <q-btn v-if="shouldDisplayPrevStepBtn" color="secondary" label="go back" class="q-mt-sm" icon="ion-arrow-back" @click="prevStep" />
      <q-space v-else/>

      <q-btn color="secondary" :label="`go to step ${getActiveStep+1}`" class="q-mt-sm" icon-right="ion-arrow-forward" @click="nextStep" />
    </div> -->
    <div class="row  items-center">
      <div class="col-4 row justify-start q-pl-md q-pb-md">
        <q-btn v-if="shouldDisplayPrevStepBtn" color="primary"  class="q-mt-sm"  @click="prevStep" >
          <q-icon name="ion-arrow-back" />
          <div v-if="$q.screen.gt.xs" class="on-right">go back</div>
        </q-btn>
      </div>
      <div class="col-4 row justify-center items-center q-pb-md">
        <div v-if="getStepTitle" class="text-center">{{getStepTitle}}</div>
        <div v-else class="text-h5">Welcome</div>
      </div>
      <div class="col-4 row justify-end q-pr-md q-pb-md">
        <q-btn color="primary"  class="q-mt-sm"  @click="nextStep" >
          <div v-if="$q.screen.gt.xs" class="on-left">{{`go to step ${getActiveStep+1}`}}</div>
          <q-icon name="ion-arrow-forward" />
        </q-btn>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'stepper',
  data () {
    return {
      max_steps: 6
    }
  },
  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep",
      getStepsConfig: "factory/getStepsConfig",
    }),
    shouldDisplayPrevStepBtn: function(){
      return this.getActiveStep && this.getActiveStep > 1;
    },
    getProgressValue: function(){
      let v = this.getActiveStep >= 1 ? this.getActiveStep/this.max_steps : 0.05;
      return v;
    },
    getStepTitle(){
      let conf = this.getStepsConfig[this.getActiveStep];
      return conf ? conf.title : false;
    }
  },
  methods: {
    nextStep(){
      // this.$store.commit('factory/setActiveStep', this.getActiveStep+1);
      let next = this.getActiveStep+1;
      if(next <= this.max_steps){
        this.$router.push(`/create/step${next}`);
      }
    },
    prevStep(){
      // this.$store.commit('factory/setActiveStep', this.getActiveStep-1);
      let prev = this.getActiveStep-1;
      if(prev >= 1){
        this.$router.push(`/create/step${prev}`);
      }
    }


  },
  watch: {
    $route: {
      handler: function(r) {
        // console.log('route change:', r);
        if(!r.path.startsWith('/create/') ){
          return;
        }
        let step = this.$route.params.step;
        if (step && step.includes("step")) {
          let stepNumber = Number(step.replace("step", ""));
          if (stepNumber && stepNumber <= this.max_steps && stepNumber > 0) {
            this.$store.commit("factory/setActiveStep", stepNumber);
          }
          else{
            this.$store.commit("factory/setActiveStep", 0);
            this.$router.push('/');
          }
        }
        else{
          this.$store.commit("factory/setActiveStep", 0);
          this.$router.push('/');
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
