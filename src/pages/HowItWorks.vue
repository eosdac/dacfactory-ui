<template>
  <q-page class="full-height">
    <div class="bg-primary">
      <div class="q-pa-md">
        <div class="text-h1">{{$t('how.intro_title')}}</div>
        <p v-html="$t('how.intro')"></p>
        <hr />
        <div class="text-h2">{{$t('how.how_start_title')}}</div>
        <p v-html="$t('how.how_start1')"></p>
        <p v-html="$t('how.how_start2')"></p>
        <hr />
        <div class="text-h2">{{$t('how.existing_title')}}</div>
        <p v-html="$t('how.existing1')"></p>
        <div class="text-h2">{{$t('how.what_happens_title')}}</div>
        <p v-html="$t('how.what_happens1')"></p>
        <p v-html="$t('how.what_happens2')"></p>
        <p v-html="$t('how.what_happens3')"></p>
        <p v-html="$t('how.what_happens4')"></p>
        <div class="text-h2">{{$t('how.modifications_title')}}</div>
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
