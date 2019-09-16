<template>
  <div>
    <q-btn label="change theme test" @click="changeTheme" />
    <div id="preview-wrapper">
      <iframe id="preview-frame" :src="parseThemeUrl"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      theme: {
        is_dark: true,
        colors: {
          $primary: "#7ead44",
          $bg1: "#476128",
          $bg2: "#222e14",
          $text1: "#f5f5f5",
          $text2: "#c2c2c2",
          $info: "#31ccec",
          $positive: "#21ba45",
          $negative: "#db2828",
          $dark: "#35471e"
        }
      }
    };
  },
  computed: {
    parseThemeUrl() {
      let url = `http://localhost:8081/?theme=${encodeURIComponent(
        JSON.stringify(this.theme)
      )}`;
      console.log(url);
      return url;
    }
  },
  methods: {
    changeTheme() {
      this.theme = {
        is_dark: true,
        colors: {
          $primary: "#425ecf",
          $bg1: "#0e1324",
          $bg2: "#1e243b",
          $text1: "rgba(255,255,255,0.9)",
          $text2: "rgba(255,255,255,0.7)",
          $info: "#31ccec",
          $positive: "#21ba45",
          $negative: "#db2828",
          $dark: "#292e42"
        }
      };
    }
  }
};
</script>

<style>
#preview-wrapper {
  width: 600px;
  height: 390px;
  padding: 0;
  overflow: hidden;
}
#preview-frame {
  width: 800px;
  height: 520px;
  border: 1px solid black;
}
#preview-frame {
  -ms-zoom: 0.75;
  -moz-transform: scale(0.75);
  -moz-transform-origin: 0 0;
  -o-transform: scale(0.75);
  -o-transform-origin: 0 0;
  -webkit-transform: scale(0.75);
  -webkit-transform-origin: 0 0;
}
</style>
