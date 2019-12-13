import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import ual from "components/ual/store";
import factory from "./factory";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      ual,
      factory
    },
    plugins: [
      createPersistedState({
        key: "ual",
        paths: ["ual.SESSION"]
      }),
      createPersistedState({
        key: "stepsData",
        paths: ["factory.stepsData"]
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false
  });
}
