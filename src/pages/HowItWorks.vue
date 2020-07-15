<template>
  <q-page class="full-height">
    <h3>{{$t('how.intro_title')}}</h3>
    <p v-html="$t('how.intro')"></p>
    <hr />

    <h4>{{$t('how.how_start_title')}}</h4>
    <p v-html="$t('how.how_start1')"></p>
    <p v-html="$t('how.how_start2')"></p>
    <hr />

    <h4>{{$t('how.existing_title')}}</h4>
    <p v-html="$t('how.existing1')"></p>
    <hr />

    <h4>{{$t('how.what_happens_title')}}</h4>
    <p v-html="$t('how.what_happens1')"></p>
    <p v-html="$t('how.what_happens2')"></p>
    <p v-html="$t('how.what_happens3')"></p>
    <p v-html="$t('how.what_happens4')"></p>
    <hr />

    <h4>{{$t('how.modifications_title')}}</h4>
    <p v-html="$t('how.modifications1')"></p>
    <p v-html="$t('how.modifications2')"></p>
    <hr />

    <p v-html="$t('how.footer')"></p>
  </q-page>
</template>