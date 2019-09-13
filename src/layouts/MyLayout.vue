<template>
  <q-layout view="lHh Lpr fff">
    <q-header :elevated="false">
      <q-toolbar style="height:60px" :class="$route.path =='/' ? 'bg-primary' : 'bg-accent'">

        <img  src="~assets/eosdac-logo-white.svg" style="height:45px"/>
        <!-- <img v-else src="~assets/eosdac-logo-notext.svg" style="height:45px"/> -->
        
        <q-toolbar-title>
          
        </q-toolbar-title>

          <q-btn v-if="$q.screen.gt.xs" label="see pricing"  unelevated :ripple="false" to="/pricing"/>
          <q-btn v-if="$q.screen.gt.xs" label="how it work"  unelevated :ripple="false" class="q-mr-sm" to="/how-it-work"/>
          
          <q-btn
            style="height:32px; width:140px"
            v-if="!getAccountName"
            label="login"
            @click="$store.dispatch('ual/renderLoginModal')"
            color="secondary"
            :flat="getShouldRenderLoginModal"
            :loading="getShouldRenderLoginModal"
            
          />
          <q-btn-dropdown v-if="getAccountName" color="white" flat :label="getAccountName" style="width:140px">
            <q-list>
              <q-item clickable dense v-close-popup @click="$store.dispatch('ual/logout')">
                <q-item-section >
                  <q-item-label >Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        
      </q-toolbar>
    </q-header>

    <q-drawer
    v-if="false"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="text-white bg-accent">

      <router-view />
      
    </q-page-container>

    <q-footer class="bg-accent">
      <stepper />
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from "vuex";
import stepper from 'components/factory/stepper'

export default {
  name: 'MyLayout',
  components:{
    stepper
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getShouldRenderLoginModal: "ual/getShouldRenderLoginModal"
    })
  },
  methods: {
    openURL
  }
}
</script>

<style>

</style>
