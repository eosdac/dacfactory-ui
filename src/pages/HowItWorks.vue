<template>
    <q-page class="bg-accent full-height">
        <div class="bg-primary">
            <div class="q-pa-md">

                <p v-html="$t('how.line1')"></p>
                <p v-html="$t('how.line2')"></p>

                <hr />

                <p v-html="$t('how.line3')"></p>

                <blockquote>
                    <p v-html="$t('how.line4')"></p>
                    <p v-html="$t('how.line5')"></p>
                    <p v-html="$t('how.line6')"></p>
                </blockquote>

                <p v-html="$t('how.line7')"></p>
                <p v-html="$t('how.line8')"></p>
                <p v-html="$t('how.line9')"></p>
                <p v-html="$t('how.line10')"></p>
                <p v-html="$t('how.line11')"></p>

            </div>
        </div>
        <div class="diagonal"></div>
    </q-page>
</template>

<script>
    export default {
        name: 'HowItWorks',
    }
</script>

<style>
    a, a:hover, a:active, a:visited { color: white; }
</style>
