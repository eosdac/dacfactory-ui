<template>
  <q-layout view="hHh lpR fFf">
    <q-header :elevated="false">
      <q-toolbar style="height:60px" class="toolbar-wrapper" :class="$route.path === '/' ? 'bg-primary' : 'bg-accent'">
        <router-link to="/" class="logo-link">
          <span class="visually-hidden">eos DAC</span>
          <img src="../statics/images/eosdac-logo.svg" />
        </router-link>
        <nav class="nav-wrapper">
          <q-btn class="btn-is-show" label="see pricing" unelevated :ripple="false" to="/pricing" />
          <q-btn class="btn-is-show" label="how it works" unelevated :ripple="false" to="/how-it-works" />
          <q-btn
            v-if="!getAccountName"
            label="login"
            @click="$store.dispatch('ual/renderLoginModal')"
            class="btn-login"
            :flat="getShouldRenderLoginModal"
            :loading="getShouldRenderLoginModal"
          />
          <q-btn-dropdown v-if="getAccountName" color="white" flat :label="getAccountName">
            <q-list>
              <q-item clickable dense v-close-popup @click="$store.dispatch('ual/logout')">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </nav>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-primary">
      <div style="max-width:80%;margin:auto" class="text-white bg-primary">
        <div>
          <router-view />
        </div>
      </div>
      <div class="diagonal">

      </div>
    </q-page-container>
    <q-footer class="bg-accent">

    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {}
};
</script>

<style scoped lang="stylus">
.toolbar-wrapper
  display flex
  justify-content space-between
.logo-link
  display flex
  margin-right 12px
  line-height normal
.nav-wrapper
  & > *
    padding 4px 10px
  @media (min-width 640px)
    display grid
    grid-template-columns auto auto auto
    grid-gap 8px
.btn-is-show
  @media (max-width 639px)
    display none
.btn-login
  width 140px
  background-color $secondary
  @media (max-width 639px)
    width 120px
</style>
