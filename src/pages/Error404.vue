<template>
  <div class="wrapper fixed-center text-center bg-black">
      <img
        src="statics/images/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    <p>Sorry, nothing is here...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .wrapper > p  {
    margin: 16px 0;
    color: #ffffff;
  }
</style>
