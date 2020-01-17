<template>
  <q-page class="full-height">
    <div class="bg-primary">
      <div class="q-pa-md">
        <div class="text-h1">Creating your own DAC is now easy!</div>
        <p v-html="$t('how.intro')"></p>
        <hr />
        <div class="text-h2">How to start</div>
        <p v-html="$t('how.how_start1')"></p>
        <p v-html="$t('how.how_start2')"></p>
        <hr />
        <div class="text-h2">I already have an existing EOS token</div>
        <p v-html="$t('how.existing1')"></p>
        <div class="text-h2">What happens after the DAC is created?</div>
        <p v-html="$t('how.what_happens1')"></p>
        <p v-html="$t('how.what_happens2')"></p>
        <p v-html="$t('how.what_happens3')"></p>
        <p v-html="$t('how.what_happens4')"></p>
        <div class="text-h2">Modifications</div>
        <p v-html="$t('how.modifications1')"></p>
        <p v-html="$t('how.modifications2')"></p>
        <hr />
        <p v-html="$t('how.footer')"></p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="stylus">
a
  color #ffffff
  transition color 0.2s
a:hover, a:focus
  color $medium-violet
</style>
