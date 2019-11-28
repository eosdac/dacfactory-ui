<template>
  <hr :class="['class']" />
</template>

<script>
export default {
  props: ["class"]
};
</script>

<style scoped>
hr {
  margin: 0 0 30px 0;
  border: 0;
  height: 1px;
  background-color: #979797;
}
</style>
