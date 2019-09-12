<template>
  <q-page class="bg-accent full-height">
    <div class="bg-primary">
      <div class="q-pa-md">
        <div class="text-center">
          <div class="text-h6">Welcome To</div>
          <div class="text-weight-bold text-h1" style="text-shadow: 1px 1px 3px #fff;">DAC</div>
          <div class="text-h5" style="letter-spacing: 3px;">• FACTORY •</div>

          <div class="row justify-center text-body1 q-mt-xl">
            <div
              style="max-width:500px"
            >Create a Decentralized Autonomous Community (DAC) to fit the needs of your organization and community.</div>
          </div>
          <div class="text-body1 q-mt-xl">Get started with these X steps</div>
          <div class="row justify-center q-mt-sm">
            <q-btn color="secondary" label="create my dac" style="width:180px" class="q-py-sm" to="create/step1" />
          </div>
        </div>
      </div>
      
    </div>
    <div class="diagonal"></div>

    <div class="row justify-center " style="  margin-top:-160px;">
      <div class="bottom-info-box q-mb-md q-pa-md text-center" >
        <div class="text-weight-bold">WHY LAUNCH A DAC?</div>
        <div
          class="text-body2 text-weight-light q-mt-sm"
        >The world of static hierarchies and centralized ownership will be disrupted</div>
        <div class="q-mt-sm">
        <q-icon name="ion-logo-youtube" @click="showYouTubeVideo=true" color="secondary" size="42px" class="cursor-pointer"/>
        <div class="text-secondary q-caption">Learn more</div>
        </div>

      </div>
    </div>
  

    <q-dialog
      
      v-model="showYouTubeVideo"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="text-white"  style="width: 700px; max-width: 80vw;">
        <q-bar class="bg-secondary">
          <div>info</div>
          <q-space />
          <q-btn dense flat icon="close" @click="showYouTubeVideo=false">
            <q-tooltip content-class="bg-secondary ">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>

          <q-video src="https://www.youtube.com/embed/PbQpAJOP6iA" style="max-width:700px;max-height:350px;height: 56.25vw; "/>
       
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  components:{

  },
  data() {
    return {
      showYouTubeVideo: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    dologin() {},

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
